import PhotoListItem from "../photoListItem";
import "./photoList.css";

const dummyPhotos = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  imageUrl: `https://picsum.photos/id/${1000 + i}/400/540`,
  username: `Photographer ${i + 1}`,
  title: `Stunning View ${i + 1}`,
}));

const PhotoList = () => {
  return (
    <section className="wrapper-photo-list">
      <div className="photo-list-title container">
        <p>
          <strong>Photo Gallery</strong>
        </p>
        <p className="photo-list_p">
          Explore our collection of stunning photos
        </p>
      </div>
      <div className=" container photo-list-grid">
        {dummyPhotos.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default PhotoList;
