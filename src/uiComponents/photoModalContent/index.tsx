import { Calendar, MessageCircle, Share } from "lucide-react";
import { Link } from "react-router-dom";
import CommentsList from "../../components/commentsList";

import type { PostByID } from "../../redux/postsSlice/types";

type Props = {
  post: PostByID;
};

const PhotoModalContent = ({ post }: Props) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const postDescValid = post?.description.Valid
    ? post?.description.String
    : "user has no bio";

  return (
    <div className="modal-body">
      <div className="modal-left">
        <div className="photo-container">
          <img src={post?.post_img} alt={post?.title} className="main-photo" />
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
                <span className="author-name">
                  <Link to={`/user/${post?.post_author_id}`}>
                    {post?.post_author}
                  </Link>
                </span>
              </div>
            </div>
          </div>

          <div className="photo-info">
            <h2 className="photo-title">{post?.title}</h2>
            <div className="photo-description">
              <p>{postDescValid}</p>
            </div>
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
  );
};

export default PhotoModalContent;
