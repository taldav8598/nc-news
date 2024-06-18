import Header from "./Header";
import "./ArticlesPage.css";
import { v4 as uuidv4 } from "uuid";
import ArticleItem from "./ArticleItem";

export default function ArticlesPage({ articles }) {
  console.log(articles);
  return (
    <>
      <Header />
      <section className="article-page-section">
        {articles.map((article) => {
          return (
            <div className="article-item-container" key={uuidv4()}>
              <ArticleItem article={article} />
            </div>
          );
        })}
      </section>
    </>
  );
}
