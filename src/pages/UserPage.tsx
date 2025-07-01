import Nav from "../components/Nav";
import ProfileCard from "../components/profileCard";
import PhotosListUser from "../components/userPhotoList";

const UserPage = () => {
  return (
    <>
      <Nav />
      <div className="user-page-layout">
        <ProfileCard />
        <div className="user-content-scrollable">
          <PhotosListUser />
        </div>
      </div>
    </>
  );
};

export default UserPage;
