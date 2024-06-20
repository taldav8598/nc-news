import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleCommentsById } from "../api";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import Comment from "./Comment";

export default function ArticlePage({ articles, setArticles }) {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [fetchArticleByIdError, setFetchArticleByIdError] = useState(null);
  const [fetchArticleCommentsByIdError, setFetchArticleByCommentsError] =
    useState(null);
  const { article_id } = useParams();
  const [votes, setVotes] = useState(getVotes());

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
  }, [votes]);

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

    setArticle({ ...article, votes: (article.votes += 1) });

    setVotes(votes + 1);
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
              <button>{articleComments}</button>
            </div>
          </>
        ) : null}
      </article>
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
