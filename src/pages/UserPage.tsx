import Nav from "../components/Nav";
import ProfileCard from "../components/profileCard";
import PhotosListUser from "../components/userPhotoList";
import CreateButton from "../uiComponents/CreateButton";

const UserPage = () => {
  return (
    <>
      <CreateButton />
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
