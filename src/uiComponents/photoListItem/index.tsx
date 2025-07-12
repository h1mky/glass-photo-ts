import { useNavigate, useLocation } from "react-router-dom";
import type { Photo } from "../../services/PostService/type";

type Props = {
  photo: Photo;
  disableClick?: boolean;
};

const PhotoListItem: React.FC<Props> = ({ photo, disableClick = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePhotoClick = () => {
    if (disableClick) return;
    navigate(`/post/${photo.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="photo-list-item" onClick={handlePhotoClick}>
      <div className="photo-item-img-wrapper">
        <img
          src={photo.post_img}
          alt={photo.title}
          className="photo-item-img"
          loading="lazy"
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
