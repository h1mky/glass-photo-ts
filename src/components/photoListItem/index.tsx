interface Photo {
  id: number;
  imageUrl: string;
  username: string;
  title: string;
}

const PhotoListItem: React.FC<{ photo: Photo }> = ({ photo }) => {
  return (
    <a className="photo-list-item" href={String(photo.id)}>
      <div className="photo-item-img-wrapper">
        <img
          src={photo.imageUrl}
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
    </a>
  );
};

export default PhotoListItem;
