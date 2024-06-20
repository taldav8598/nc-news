import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ArticleItem({ article }) {
  const [articleItemVotes, setArticleItemVotes] = useState(
    getArticleItemVotes()
  );

  function getArticleItemVotes() {
    const articlesData = JSON.parse(localStorage.getItem("articles"));

    const votes = articlesData.filter(
      (articleObj) => articleObj.article_id === article.article_id
    )[0].votes;

    return votes || 0;
  }

  return (
    <>
      <aside key={uuidv4()}>
        <img key={uuidv4()} width="200px" src={article.article_img_url} />
        <button key={uuidv4()}>{articleItemVotes}</button>
        <button key={uuidv4()}>{article.comment_count} comments</button>
      </aside>
      <article key={uuidv4()}>
        <h3 key={uuidv4()}>{article.title}</h3>
        <h4 key={uuidv4()}>{article.topic}</h4>
        <h5 key={uuidv4()}>{article.author}</h5>
        <p key={uuidv4()}>{new Date(article.created_at).toUTCString()}</p>
      </article>
    </>
  );
}
