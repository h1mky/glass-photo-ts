import { Link } from "react-router-dom";

export interface CommentsItem {
  idComment: number;
  userId: number;
  userImg: string;
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
  userImg,
}) => {
  const formatTimeAgo = (date: Date) => {
    const formatedDate = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - formatedDate.getTime()) / 1000
    );

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
      <Link className="comment-avatar" to={`/user/${userId.toString()}`}>
        <img src={userImg} alt={userName} />
      </Link>
      <div className="comment-content">
        <div className="comment-header">
          <Link className="comment-author" to={`/user/${userId.toString()}`}>
            {userName}
          </Link>
          <span className="comment-time">{formatTimeAgo(created_at)}</span>
        </div>
        <div className="comment-text">{content}</div>
      </div>
    </div>
  );
};

export default CommentItem;
