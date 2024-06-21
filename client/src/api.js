import axios from "axios";

export function fetchArticles() {
  return axios
    .get("https://be-nc-news-04rn.onrender.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    });
}

export function fetchArticleById(article_id) {
  return axios
    .get(`https://be-nc-news-04rn.onrender.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
}

export function fetchArticleCommentsById(article_id) {
  return axios
    .get(
      `https://be-nc-news-04rn.onrender.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      return data.comments;
    });
}

export function postArticleCommentById(event, article_id, comment, username) {
  event.preventDefault();
  console.log(article_id, comment, username);
  return axios
    .post(
      `https://be-nc-news-04rn.onrender.com/api/articles/${article_id}/comments`,
      {
        username: username,
        body: comment,
      }
    )
    .then(({ data }) => {
      return data.comment;
    });
}
