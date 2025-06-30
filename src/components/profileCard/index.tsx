import "./profileCard.css";

const ProfileCard = () => {
  return (
    <div className="profile-card">
      {/* Главное фото */}
      <div className="profile-hero">
        <img
          src="https://theafictionado.wordpress.com/wp-content/uploads/2017/01/luckystar.png"
          className="hero-image"
        />
      </div>

      {/* Информация о пользователе */}
      <div className="profile-info">
        <h1 className="profile-name">zvezd</h1>
        <p className="profile-bio pb-3">dsa</p>

        {/* Навигационные ссылки */}
        <div className="profile-nav">
          <span className="nav-item active">Photos</span>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
