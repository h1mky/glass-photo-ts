import "./Nav.css";

const Nav = () => {
  return (
    <div className="wrapper-nav">
      <div className="nav container">
        <ul className="nav-list left-side">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              explore
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Highlights
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Membership
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
        </ul>

        <div className="nav-right-buttons">
          <a href="#" className="auth-btn sign-in-style">
            <i className="fas fa-arrow-right button-icon"></i>
            <span className="button-text">Sign In</span>
          </a>
          <a href="#" className="auth-btn sign-up-style">
            <i className="fas fa-arrow-up button-icon"></i>
            <span className="button-text">Sign Up</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nav;
