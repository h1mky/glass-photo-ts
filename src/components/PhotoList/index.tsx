import "./photoList.css";

const dummyPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  imageUrl: `https://picsum.photos/id/${1000 + i}/400/300`, // Пример изображений
  username: `Photographer ${i + 1}`,
  title: `Stunning View ${i + 1}`,
}));

const PhotoList = () => {
  return (
    <section className="wrapper-photo-list">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Photos</h2>
          <p className="section-subtitle">
            New uploads with the highest Pulse rating
          </p>
        </div>
        <div className="photo-list">
          {dummyPhotos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="photo-card-image"
              />
              <div className="overlay">
                <p className="username">{photo.username}</p>
                <p className="title">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoList;
