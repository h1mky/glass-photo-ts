import { useNavigate, useLocation } from "react-router-dom";
import type { Photo } from "../../redux/postsSlice/types";

const PhotoListItem: React.FC<{ photo: Photo }> = ({ photo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePhotoClick = () => {
    navigate(`/post/${photo.id}`, { state: { backgroundLocation: location } });
  };

  return (
    <div className="photo-list-item" onClick={handlePhotoClick}>
      <div className="photo-item-img-wrapper">
        <img
          src={photo.post_img}
          alt={photo.title}
          className="photo-item-img"
        />

        <div className="photo-item-overlay">
          <div className="photo-item-info">
            <div className="photo-username">{photo.username}</div>
            <div className="photo-description">{photo.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;
