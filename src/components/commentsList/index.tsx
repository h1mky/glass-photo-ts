import { useCallback, useState } from "react";
import CommentItem from "../commentsListItem.tsx";
import { useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import {
  useCommentsGet,
  useCommentsPost,
  useDeleteComment,
} from "../../services/commentsService/service.ts";

import { useSelector } from "react-redux";
import { selectUserMain } from "../../redux/userSlice/selector.ts";

const CommentsList = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ?? "";
  const userData = useSelector(selectUserMain);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    refetch,
  } = useCommentsGet(postId);

  const { mutate: deleteComment, reset: resetDeleteStatus } =
    useDeleteComment();

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    mutate: postComment,
    isPending: isPosting,
    isSuccess,
    isError,
    reset,
  } = useCommentsPost(postId);

  const handleDelete = useCallback(
    (commentId: number) => {
      deleteComment(commentId, {
        onSuccess: () => {
          refetch();
          setDeleteSuccess(true);
        },
        onError: () => {
          setDeleteError(true);
        },
      });
    },
    [deleteComment, refetch]
  );

  const handleClose = () => {
    reset();
    setSubmitError("");
    setDeleteSuccess(false);
    setDeleteError(false);
    resetDeleteStatus();
  };

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment required").max(128),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!postId) return;

      postComment(values, {
        onSuccess: () => {
          resetForm();
          refetch();
        },
        onError: (err) => {
          setSubmitError(err?.message || "Failed to post comment");
        },
      });
    },
  });

  return (
    <div className="comments-section">
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
          {isSuccess ? "Comment posted" : submitError}
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteSuccess || deleteError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionProps={{ onExited: handleClose }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={deleteSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {deleteSuccess ? "Comment deleted" : "Error deleting comment"}
        </Alert>
      </Snackbar>

      <div className="comments-header">
        <h3>Comments ({commentsData?.length || 0})</h3>
      </div>

      <div className="comments-list">
        {isCommentsLoading ? (
          <div className="loader-container">
            <ClipLoader color="#f0f0f0" />
          </div>
        ) : (
          commentsData?.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {!userData?.id ? (
        <div className="d-flex justify-content-between px-3 py-2">
          <div className="d-flex flex-column text-comms">
            <p>glass-photo</p>
            <p>Photography Community</p>
          </div>
          <Link to={"/sign-up"} className="auth-btn sign-up-style">
            <i className="fas fa-arrow-up button-icon"></i>
            <span className="button-text">Sign Up</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="comment-form">
          <div className="comment-input-wrapper">
            <img
              src={userData.user_img}
              alt="Your avatar"
              className="comment-form-avatar"
            />
            <input
              type="text"
              name="content"
              placeholder="Add a comment..."
              className="comment-input"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="submit"
              className="comment-submit"
              disabled={isPosting || !formik.isValid || formik.isSubmitting}
            >
              {isPosting ? <ClipLoader size={20} color="#fff" /> : "Post"}
            </button>
          </div>
          {formik.errors.content && formik.submitCount > 0 && (
            <div className="error-text">{formik.errors.content}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default CommentsList;
