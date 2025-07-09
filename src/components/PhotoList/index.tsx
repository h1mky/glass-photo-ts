import { ClipLoader } from "react-spinners";
import PhotoListItem from "../../uiComponents/photoListItem";

import "./photoList.css";
import { useFetchAllPosts } from "../../services/PostService/service";

const PhotoList = () => {
  const { data: postData, isPending, isError, refetch } = useFetchAllPosts();

  const renderHeader = () => (
    <div className="photo-list-title container">
      <p>
        <strong>Photo Gallery</strong>
      </p>
      <p className="photo-list_p">Explore our collection of stunning photos</p>
    </div>
  );

  if (isPending) {
    return (
      <section className="wrapper-photo-list">
        {renderHeader()}
        <div
          className="container"
          style={{ textAlign: "center", padding: "50px 0" }}
        >
          <ClipLoader color="#f0f0f0f0" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="wrapper-photo-list">
        {renderHeader()}
        <div
          className="container"
          style={{ textAlign: "center", padding: "50px 0" }}
        >
          <div className="error-message">
            <p style={{ color: "red", fontSize: "18px", marginBottom: "20px" }}>
              Oops! Something went wrong while loading photos
            </p>
            <button
              onClick={() => refetch()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wrapper-photo-list">
      {renderHeader()}
      <div className="container photo-list-grid">
        {postData?.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default PhotoList;
