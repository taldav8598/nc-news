import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

export default function ArticlePage({ articles, error, setError }) {
  const [article, setArticle] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    fetchArticleById(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setIsArticleLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  const articleComments = articles.filter(
    (article) => article.article_id === +article_id
  )[0]?.comment_count;

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      {isArticleLoading ? (
        <Loading />
      ) : (
        <>
          <h3>{article.title}</h3>
          <h4>{article.topic}</h4>
          <h5>{article.author}</h5>
          <p>{new Date(article.created_at).toUTCString()}</p>
          <img width="200px" src={article.article_img_url} alt="" />
          <p>{article.body}</p>
          <div>
            <button>{article.votes}</button>
            <button>{articleComments}</button>
          </div>
        </>
      )}
    </>
  );
}
