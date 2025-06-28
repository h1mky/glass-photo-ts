import { Calendar, MessageCircle, Share, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CommentsList from "../commentsList";
import { useEffect, useState } from "react";

import { request } from "../../hook/http.hook";

import "./PostModal.css";

export interface Post {
  post_id: number;
  post_author: string;
  post_author_img: string;
  post_img: string;
  title: string;
  created_at: Date;
}

const PhotoModal = () => {
  const [post, setPost] = useState<Post | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const response = await request(
            `http://localhost:3000/post/${id}`,
            "GET"
          );
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                src={post?.post_img}
                alt={post?.title}
                className="main-photo"
              />
            </div>
          </div>

          <div className="modal-right">
            <div className="photo-details">
              <div className="photo-header">
                <div className="author-info">
                  <img
                    src={post?.post_author_img}
                    alt={post?.post_author}
                    className="author-avatar"
                  />
                  <div className="author-details">
                    <span className="author-name">{post?.post_author}</span>
                  </div>
                </div>
              </div>

              <div className="photo-info">
                <h2 className="photo-title">{post?.title}</h2>
                <div className="photo-metadata">
                  <div className="metadata-item">
                    <Calendar size={16} />
                    <span>
                      {post?.created_at
                        ? formatDate(
                            typeof post.created_at === "string"
                              ? post.created_at
                              : post.created_at.toISOString()
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
