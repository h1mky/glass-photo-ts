import PhotoListItem from "../photoListItem";
import "./photoList.css";
import { useState, useEffect } from "react";
import { fetchAllPosts } from "../../services/PostService/service";
import type { Photo } from "../photoListItem";

const PhotoList = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      try {
        const posts = await fetchAllPosts();
        setPhotos(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAndSetPosts();
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
