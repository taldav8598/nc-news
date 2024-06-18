import Header from "./Header";
import "./ArticlesPage.css";
import { v4 as uuidv4 } from "uuid";
import ArticleItem from "./ArticleItem";
import { Link } from "react-router-dom";

export default function ArticlesPage({ articles }) {
  return (
    <>
      <Header />
      <section className="article-page-section">
        {articles.map((article) => {
          return (
            <Link to={`/articles/${article.article_id}`}>
              <div className="article-item-container" key={uuidv4()}>
                <ArticleItem article={article} />
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
