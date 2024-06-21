import Header from "./Header";
import "./ArticlesPage.css";
import { v4 as uuidv4 } from "uuid";
import ArticleItem from "./ArticleItem";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function ArticlesPage({
  articles,
  fetchArticlesError,
  isArticlesLoading,
  comments,
}) {
  return (
    <>
      <Header />
      <section className="article-page-section">
        {fetchArticlesError ? (
          <ErrorPage fetchArticlesError={fetchArticlesError} />
        ) : isArticlesLoading ? (
          <Loading />
        ) : !isArticlesLoading ? (
          articles.map((article, index) => {
            return (
              <Link to={`/articles/${article.article_id}`}>
                <div className="article-item-container" key={uuidv4()}>
                  <ArticleItem
                    article={article}
                    articles={articles}
                    index={index}
                  />
                </div>
              </Link>
            );
          })
        ) : null}
      </section>
    </>
  );
}
