import "./profileCard.css";

const ProfileCard = () => {
  return (
    <section className="profile-card">
      <div className="profile-hero">
        <img
          src="https://theafictionado.wordpress.com/wp-content/uploads/2017/01/luckystar.png"
          className="hero-image"
        />
      </div>

      <div className="profile-info">
        <h1 className="profile-name">@zvezd</h1>
        <p className="profile-bio pb-3">dsa</p>

        <div className="profile-nav">
          <span className="nav-item active">Photos</span>
        </div>
      </div>
    </section>
  );
};
export default ProfileCard;
