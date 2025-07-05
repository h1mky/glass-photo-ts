import CommentItem from "../commentsListItem.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCommentsThunk } from "../../redux/commentsSlice/slice.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  selectComments,
  selectCommentsLoading,
} from "../../redux/commentsSlice/selector.ts";

import type { AppDispatch } from "../../redux/store.ts";

import { ClipLoader } from "react-spinners";
import { Snackbar, Alert } from "@mui/material";

import { selectUserMain } from "../../redux/userSlice/selector.ts";
import { postComments } from "../../services/commentsService/service.ts";

import { useFormik } from "formik";
import * as Yup from "yup";

const CommentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(selectComments);
  const loading = useSelector(selectCommentsLoading);
  const userImg = useSelector(selectUserMain);
  const { id } = useParams<{ id: string }>();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) dispatch(fetchCommentsThunk(id));
  }, [id, dispatch]);

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const validationSchema = Yup.object({
    content: Yup.string()
      .required("Comment required")
      .max(128, "Max 128 characters"),
  });

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!id) return;
      setStatus("loading");
      setErrorMessage("");

      try {
        const { status: responseStatus } = await postComments(id, values);

        if (responseStatus === 201) {
          setStatus("success");
          resetForm();
          dispatch(fetchCommentsThunk(id));
        } else {
          setStatus("error");
          setErrorMessage("Failed to post comment");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      }
    },
  });

  return (
    <div className="comments-section">
      <Snackbar
        open={status === "success" || status === "error"}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionProps={{ onExited: () => setStatus("idle") }}
        onClose={handleClose}
      >
        <Alert
          sx={{ width: "100%" }}
          severity={status === "success" ? "success" : "error"}
          variant="filled"
          onClose={handleClose}
        >
          {status === "success" ? "Comment posted" : errorMessage}
        </Alert>
      </Snackbar>

      <div className="comments-header">
        <h3>Comments ({comments?.length})</h3>
      </div>

      <div className="comments-list">
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#f0f0f0" />
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

      <form onSubmit={formik.handleSubmit} className="comment-form">
        <div className="comment-input-wrapper">
          <img
            src={userImg?.user_img}
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
            disabled={
              status === "loading" || !formik.isValid || formik.isSubmitting
            }
          >
            {status === "loading" ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Post"
            )}
          </button>
        </div>
        {formik.touched.content && formik.errors.content && (
          <div className="form-error">{formik.errors.content}</div>
        )}
      </form>
    </div>
  );
};

export default CommentsList;
