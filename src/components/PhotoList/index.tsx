import PhotoListItem from "../photoListItem";
import "./photoList.css";
import { useState, useEffect } from "react";
import { request } from "../../hook/http.hook";
import type { Photo } from "../photoListItem";

const PhotoList = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await request("http://localhost:3000/post", "GET");
        console.log("response from API:", response);
        setPhotos(response);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

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
        {photos.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default PhotoList;
