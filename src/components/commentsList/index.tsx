import CommentItem from "../commentsListItem.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../hook/http.hook.ts";
import type { CommentsItem } from "../commentsListItem.tsx";

const CommentsList = () => {
  const [comments, setComments] = useState<CommentsItem[] | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const response = await request(
            `http://localhost:3000/comments/${id}`,
            "GET"
          );
          console.log("response from API:", response);
          setComments(response);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
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
