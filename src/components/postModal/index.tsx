import { Calendar, Heart, MessageCircle, Share, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CommentsList from "../commentsList";

const PhotoModal = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // post ID из URL

  // мок-пост
  const post = {
    post_id: Number(id),
    title: "Mock Post",
    post_img: "https://via.placeholder.com/600x400",
    created_at: new Date().toISOString(),
    post_author: "demo_user",
    post_author_id: 12,
  };

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
    navigate(-1); // вернуться назад (на background route)
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-left">
            <div className="photo-container">
              <img
                src={post.post_img}
                alt={post.title}
                className="main-photo"
              />
            </div>
          </div>

          <div className="modal-right">
            <div className="photo-details">
              <div className="photo-header">
                <div className="author-info">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.post_author}`}
                    alt={post.post_author}
                    className="author-avatar"
                  />
                  <div className="author-details">
                    <span className="author-name">{post.post_author}</span>
                  </div>
                </div>
              </div>

              <div className="photo-info">
                <h2 className="photo-title">{post.title}</h2>
                <div className="photo-metadata">
                  <div className="metadata-item">
                    <Calendar size={16} />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="metadata-item">
                    <span>Post ID: {post.post_id}</span>
                  </div>
                </div>
              </div>

              <div className="photo-actions">
                <button className="action-btn">
                  <Heart size={20} />
                  <span>Like</span>
                </button>
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
