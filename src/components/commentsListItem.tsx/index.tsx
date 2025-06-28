interface CommentsItem {
  idComment: number;
  userId: number;
  postId: number;
  userName: string;
  content: string;
  created_at: Date;
}

const CommentItem: React.FC<CommentsItem> = ({
  idComment,
  userId,
  userName,
  content,
  created_at,
}) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="comment-item" key={idComment}>
      <a className="comment-avatar" href={userId.toString()}>
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
          alt={userName}
        />
      </a>
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{userName}</span>
          <span className="comment-time">{formatTimeAgo(created_at)}</span>
        </div>
        <div className="comment-text">{content}</div>
      </div>
    </div>
  );
};

export default CommentItem;
