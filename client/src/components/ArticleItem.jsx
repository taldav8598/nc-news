import { v4 as uuidv4 } from "uuid";

export default function ArticleItem({ article }) {
  return (
    <>
      <aside key={uuidv4()}>
        <img key={uuidv4()} width="200px" src={article.article_img_url} />
        <button key={uuidv4()}>{article.votes}</button>
        <button key={uuidv4()}>comments</button>
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
