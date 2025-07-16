import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { useSelector } from "react-redux";
import { selectUserMain } from "../../redux/userSlice/selector";

import type { CommentsItem } from "../../services/commentsService/service";

const CommentItem: React.FC<CommentsItem> = ({
  id,
  userId,
  userImg,
  userName,
  content,
  created_at,
  onDelete,
}) => {
  const actualUser = useSelector(selectUserMain);

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
  };

  return (
    <div className="comment-item" key={id}>
      <Link className="comment-avatar" to={`/user/${userId}`}>
        <img src={userImg} alt={userName} />
      </Link>
      <div className="comment-content">
        <div className="comment-header">
          <Link className="comment-author" to={`/user/${userId}`}>
            {userName}
          </Link>
          <span className="comment-time">{formatTimeAgo(created_at)}</span>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      {actualUser?.id === userId ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <FaTrash className="comment-delete" onClick={() => onDelete(id)} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CommentItem;
