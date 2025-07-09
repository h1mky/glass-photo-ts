import PhotoListItem from "../../uiComponents/photoListItem";
import { useParams } from "react-router-dom";
import { useFetchUserPosts } from "../../services/PostService/service";
import { ClipLoader } from "react-spinners";

import "./userPhotoList.css";

const PhotosListUser = () => {
  const { id } = useParams();

  const { data: photos, isPending, isError } = useFetchUserPosts(Number(id));

  if (isPending) {
    return (
      <div className="user-photos-page">
        <div className="photo-list-user user-style-scope loader-container">
          <ClipLoader color="#f0f0f0" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="user-photos-page">
        <div className="photo-list-user user-style-scope">
          <p style={{ color: "red", textAlign: "center" }}>
            Failed to load user photos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-photos-page">
      <div className="photo-list-user user-style-scope">
        {photos?.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotosListUser;
