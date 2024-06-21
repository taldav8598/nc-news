import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleCommentsById } from "../api";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import Comment from "./Comment";
import "./ArticlePage.css";
import { postArticleCommentById } from "../api";

export default function ArticlePage({
  articles,
  username,
  comments,
  setComments,
}) {
  const [article, setArticle] = useState([]);

  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [fetchArticleByIdError, setFetchArticleByIdError] = useState(null);
  const [fetchArticleCommentsByIdError, setFetchArticleByCommentsError] =
    useState(null);
  const { article_id } = useParams();
  const [votes, setVotes] = useState(getVotes());
  const [commentInput, setCommentInput] = useState("");

  function getVotes() {
    const articlesDataArr = JSON.parse(localStorage.getItem("articles"));

    const votes = articlesDataArr.filter(
      (article) => article.article_id === Number(article_id)
    )[0]?.votes;

    return votes || 0;
  }

  useEffect(() => {
    fetchArticleById(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setIsArticleLoading(false);
      })
      .catch((err) => {
        setFetchArticleByIdError(err);
      });

    fetchArticleCommentsById(article_id)
      .then((articleCommentsFromApi) => {
        setComments(articleCommentsFromApi);
        setIsCommentsLoading(false);
      })
      .catch((err) => {
        setFetchArticleByCommentsError(err);
      });
  }, []);

  const articleComments = articles.filter(
    (article) => article?.article_id === +article_id
  )[0]?.comment_count;

  function handleVotes(id) {
    const articlesData = JSON.parse(localStorage.getItem("articles"));

    const newArticlesData = articlesData.map((articleObj) => {
      if (articleObj?.title === id) {
        return { ...articleObj, votes: articleObj.votes + 1 };
      } else {
        return articleObj;
      }
    });

    localStorage.setItem("articles", JSON.stringify(newArticlesData));

    setArticle({ ...article, votes: article.votes + 1 });

    setVotes(votes + 1);
  }

  function handleCommentInput(event) {
    setCommentInput(event.target.value);
  }

  return (
    <>
      <article>
        {fetchArticleByIdError ? (
          <ErrorPage error={fetchArticleByIdError} />
        ) : isArticleLoading ? (
          <Loading />
        ) : !isArticleLoading ? (
          <>
            <h3>{article?.title}</h3>
            <h4>{article?.topic}</h4>
            <h5>{article?.author}</h5>
            <p>{new Date(article?.created_at).toUTCString()}</p>
            <img width="200px" src={article?.article_img_url} alt="" />
            <p>{article?.body}</p>
            <div>
              <button
                id={article?.title}
                onClick={(event) => handleVotes(event.target.id)}
              >
                {votes}
              </button>
              <button>{comments.length}</button>
            </div>
          </>
        ) : null}
      </article>
      <form
        onSubmit={(event) =>
          postArticleCommentById(event, article_id, commentInput, username)
            .then((comment) => {
              setCommentInput("");
              setIsCommentsLoading(true);
              fetchArticleCommentsById(article_id)
                .then((articleCommentsFromApi) => {
                  setComments(articleCommentsFromApi);

                  const articlesData = JSON.parse(
                    localStorage.getItem("articles")
                  );

                  const newArticlesData = articlesData.map((articleObj) => {
                    if (articleObj?.article_id === +article_id) {
                      return {
                        ...articleObj,
                        comment_count: (
                          +articleObj.comment_count + 1
                        ).toString(),
                      };
                    } else {
                      return articleObj;
                    }
                  });

                  localStorage.setItem(
                    "articles",
                    JSON.stringify(newArticlesData)
                  );

                  setIsCommentsLoading(false);
                })
                .catch((err) => {
                  setFetchArticleByCommentsError(err);
                });
            })
            .catch((err) => console.log(err))
        }
        className="comment-form"
      >
        <textarea
          value={commentInput}
          onChange={(event) => handleCommentInput(event)}
          id="comment-text-area"
          placeholder="Add comment..."
        ></textarea>
        <button>Post</button>
      </form>
      <section>
        {fetchArticleCommentsByIdError ? (
          <ErrorPage
            error={{ message: "There are no comments for this article yet." }}
          />
        ) : isCommentsLoading ? (
          <Loading />
        ) : !isCommentsLoading ? (
          comments.map((comment) => {
            return (
              <>
                <Comment comment={comment} />
              </>
            );
          })
        ) : null}
      </section>
    </>
  );
}
