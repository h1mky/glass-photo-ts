import { Link } from "react-router-dom";
import {
  useDeleteComment,
  type CommentsItem,
} from "../../services/commentsService/service";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import { Alert, Snackbar } from "@mui/material";

const CommentItem: React.FC<CommentsItem> = ({
  id,
  userId,
  userName,
  content,
  created_at,
  userImg,
}) => {
  const {
    mutate: deleteComment,
    isError,
    isSuccess,
    reset,
  } = useDeleteComment();

  const [, setSubmitError] = useState("");

  const handleClose = () => {
    reset();
    setSubmitError("");
  };

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
    <div className="comment-item" key={id}>
      <Snackbar
        open={isSuccess || isError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionProps={{ onExited: handleClose }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isSuccess ? "Comment deleted" : "Error delete comment"}
        </Alert>
      </Snackbar>
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
      <FaTrash className="comment-delete" onClick={() => deleteComment(id)} />
    </div>
  );
};

export default CommentItem;
