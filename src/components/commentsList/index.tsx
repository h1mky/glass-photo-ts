import CommentItem from "../commentsListItem.tsx";

const CommentsList = () => {
  const mockComments = [
    {
      idComment: 1,
      userId: 1,
      postId: 1,
      userName: "John Doe",
      content: "This is a great post! Thanks for sharing.",
      created_at: new Date("2024-06-28T10:30:00"),
    },
    {
      idComment: 2,
      userId: 2,
      postId: 1,
      userName: "Jane Smith",
      content: "I completely agree with your point of view. Very insightful!",
      created_at: new Date("2024-06-28T11:15:00"),
    },
    {
      idComment: 3,
      userId: 3,
      postId: 1,
      userName: "Mike Johnson",
      content:
        "Could you elaborate more on this topic? I'd love to learn more.",
      created_at: new Date("2024-06-28T12:45:00"),
    },
  ];

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>Comments ({mockComments.length})</h3>
      </div>

      <div className="comments-list">
        {mockComments.map((comment) => (
          <CommentItem key={comment.idComment} {...comment} />
        ))}
      </div>

      <div className="comment-form">
        <div className="comment-input-wrapper">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=current-user"
            alt="Your avatar"
            className="comment-form-avatar"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button className="comment-submit">Post</button>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
