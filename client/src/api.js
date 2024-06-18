import axios from "axios";

export function fetchArticles() {
  return axios
    .get("https://be-nc-news-04rn.onrender.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => console.log(err));
}
