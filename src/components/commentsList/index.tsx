import CommentItem from "../commentsListItem.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CommentsItem } from "../commentsListItem.tsx";
import { fetchComments } from "../../services/commentsService/service.ts";

const CommentsList = () => {
  const [comments, setComments] = useState<CommentsItem[] | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchAndSetComments = async () => {
      if (!id) {
        setComments(null);
        return;
      }
      const commentsData = await fetchComments(id.toString());
      setComments(commentsData);
    };

    fetchAndSetComments();
  }, [id]);

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>Comments ({comments?.length})</h3>
      </div>

      <div className="comments-list">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.idComment}
            userId={comment.userId}
            idComment={comment.idComment}
            userImg={comment.userImg}
            userName={comment.userName}
            content={comment.content}
            created_at={comment.created_at}
          />
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
