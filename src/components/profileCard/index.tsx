import "./profileCard.css";
import { useUserProfile } from "../../services/UserService/service";
import { useParams } from "react-router-dom";

import NotFoundPage from "../../pages/page404";
import { ClipLoader } from "react-spinners";

const ProfileCard = () => {
  const { id } = useParams();
  const numericId = Number(id);

  const { data, isLoading, isError } = useUserProfile(numericId);
  const user = data?.data;

  const userDescValid =
    user?.description?.Valid && user.description.String.trim() !== ""
      ? user.description.String
      : "user has no bio";

  if (isLoading) {
    return (
      <div className="profile-loading">
        <ClipLoader size={40} color="#36d7b7" />
      </div>
    );
  }

  if (isError || !user?.id) {
    return <NotFoundPage />;
  }

  return (
    <section className="profile-card">
      <div className="profile-hero">
        <img src={user.user_img} className="hero-image" />
      </div>

      <div className="profile-info">
        <h1 className="profile-name">@{user.username}</h1>
        <p className="profile-bio pb-3">{userDescValid}</p>

        <div className="profile-nav">
          <span className="nav-item active">Photos</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
