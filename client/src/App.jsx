import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import TopicPage from "./components/TopicPage";
import ArticlesPage from "./components/ArticlesPage";
import UsersPage from "./components/UsersPage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchArticles } from "./api";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, []);

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/topics" element={<TopicPage />}></Route>
        <Route
          path="/articles"
          element={<ArticlesPage articles={articles} />}
        ></Route>
        <Route path="/users" element={<UsersPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
