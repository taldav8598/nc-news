import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
}
