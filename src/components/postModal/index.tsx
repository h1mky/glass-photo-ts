import { Calendar, MessageCircle, Share, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CommentsList from "../commentsList";
import { useEffect } from "react";

import "./PostModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  selectPostByIdLoading,
} from "../../redux/postsSlice/selector";
import { fetchPostThunk } from "../../redux/postsSlice/slice";
import type { AppDispatch } from "../../redux/store";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const PhotoModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const postByID = useSelector(selectPostById);
  const loading = useSelector(selectPostByIdLoading);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  useEffect(() => {
    dispatch(fetchPostThunk(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClose = () => {
    navigate(-1);
  };

  const postDescValid = postByID?.description.Valid
    ? postByID?.description.String
    : "user has no bio";

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-left">
            <div className="photo-container">
              {loading ? (
                <div
                  style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ClipLoader color="#f0f0f0f0" size={40} />
                </div>
              ) : (
                <img
                  src={postByID?.post_img}
                  alt={postByID?.title}
                  className="main-photo"
                />
              )}
            </div>
          </div>

          <div className="modal-right">
            <div className="photo-details">
              <div className="photo-header">
                <div className="author-info">
                  <img
                    src={postByID?.post_author_img}
                    alt={postByID?.post_author}
                    className="author-avatar"
                  />
                  <div className="author-details">
                    <span className="author-name">
                      <Link to={`/user/${postByID?.post_author_id}`}>
                        {postByID?.post_author}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>

              <div className="photo-info">
                <h2 className="photo-title">{postByID?.title}</h2>
                <div className="photo-description">
                  <p>{postDescValid}</p>
                </div>
                <div className="photo-metadata">
                  <div className="metadata-item">
                    <Calendar size={16} />
                    <span>
                      {postByID?.created_at
                        ? formatDate(
                            typeof postByID.created_at === "string"
                              ? postByID.created_at
                              : postByID.created_at.toISOString()
                          )
                        : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="photo-actions">
                <button className="action-btn">
                  <MessageCircle size={20} />
                  <span>Comment</span>
                </button>
                <button className="action-btn">
                  <Share size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <CommentsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
