import { Link } from "react-router-dom";

export interface Photo {
  id: number;
  post_img: string;
  username: string;
  title: string;
}

const PhotoListItem: React.FC<{ photo: Photo }> = ({ photo }) => {
  return (
    <Link className="photo-list-item" to={`/post/${photo.id}`}>
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
    </Link>
  );
};

export default PhotoListItem;
