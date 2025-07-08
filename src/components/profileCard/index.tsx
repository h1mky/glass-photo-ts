import "./profileCard.css";
import { fetchUserProfile } from "../../services/UserService/service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NotFoundPage from "../../pages/page404";

import type { DescriptionOrImage } from "../../redux/postsSlice/types";

interface User {
  id: number;
  username: string;
  user_img: string;
  description: DescriptionOrImage;
}

const ProfileCard = () => {
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUserProfile(Number(id));
      setUser(response.data);
    };
    fetchData();
  }, [id]);

  const userDescValid = user?.description.Valid
    ? user?.description.String
    : "user has no bio";

  return (
    <>
      {!user?.id ? (
        <NotFoundPage />
      ) : (
        <section className="profile-card">
          <div className="profile-hero">
            <img src={user?.user_img} className="hero-image" />
          </div>

          <div className="profile-info">
            <h1 className="profile-name">@{user?.username}</h1>
            <p className="profile-bio pb-3">{userDescValid}</p>

            <div className="profile-nav">
              <span className="nav-item active">Photos</span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ProfileCard;
