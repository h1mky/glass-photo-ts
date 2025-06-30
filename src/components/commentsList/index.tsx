import CommentItem from "../commentsListItem.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchCommentsThunk } from "../../redux/commentsSlice/slice.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  selectComments,
  // selectCommentsError,
  selectCommentsLoading,
} from "../../redux/commentsSlice/selector.ts";

import type { AppDispatch } from "../../redux/store.ts";

import { ClipLoader } from "react-spinners";

const CommentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(selectComments);
  const loading = useSelector(selectCommentsLoading);
  // const error = useSelector(selectCommentsError);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsThunk(id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>Comments ({comments?.length})</h3>
      </div>

      <div className="comments-list">
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#f0f0f0f0" />
          </div>
        ) : (
          comments?.map((comment) => (
            <CommentItem
              key={comment.idComment}
              userId={comment.userId}
              idComment={comment.idComment}
              userImg={comment.userImg}
              userName={comment.userName}
              content={comment.content}
              created_at={comment.created_at}
            />
          ))
        )}
      </div>

      <div className="comment-form">
        <div className="comment-input-wrapper">
          <img
            src="https://theafictionado.wordpress.com/wp-content/uploads/2017/01/luckystar.png"
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
