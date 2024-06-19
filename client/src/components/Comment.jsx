import "./Comment.css";

export default function Comment({ comment }) {
  return (
    <div className="comment-container">
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <p>{new Date(comment.created_at).toUTCString()}</p>
      <p>{comment.votes}</p>
    </div>
  );
}
