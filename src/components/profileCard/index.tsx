import "./profileCard.css";
import { fetchUserProfile } from "../../services/UserService/service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { DescriptionOrImage } from "../models";

interface User {
  id: number;
  username: string;
  user_img: DescriptionOrImage;
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
    <section className="profile-card">
      <div className="profile-hero">
        <img src={user?.user_img.String} className="hero-image" />
      </div>

      <div className="profile-info">
        <h1 className="profile-name">@{user?.username}</h1>
        <p className="profile-bio pb-3">{userDescValid}</p>

        <div className="profile-nav">
          <span className="nav-item active">Photos</span>
        </div>
      </div>
    </section>
  );
};
export default ProfileCard;
