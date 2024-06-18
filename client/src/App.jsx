import "./App.css";
import ErrorPage from "./components/ErrorPage";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import TopicPage from "./components/TopicPage";
import ArticlesPage from "./components/ArticlesPage";
import UsersPage from "./components/UsersPage";
import ArticlePage from "./components/ArticlePage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchArticles } from "./api";

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles()
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={<HomePage />}
          errorElement={<ErrorPage error={error} />}
        ></Route>
        <Route path="/topics" element={<TopicPage />}></Route>
        <Route
          path="/articles"
          element={
            <ArticlesPage
              articles={articles}
              error={error}
              setError={setError}
            />
          }
          errorElement={<ErrorPage error={error} />}
        ></Route>
        <Route path="/users" element={<UsersPage />}></Route>
        <Route
          path="/articles/:article_id"
          element={
            <ArticlePage
              articles={articles}
              error={error}
              setError={setError}
            />
          }
          errorElement={<ErrorPage error={error} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
