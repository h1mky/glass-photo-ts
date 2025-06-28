import "./footer.css";

const Footer = () => {
  return (
    <footer className="wrapper-footer">
      <div className="container d-flex">
        <div className="d-flex about-footer align-items-center">
          <ul>
            <li className="about-footer_item">
              <p>Glass</p>
            </li>
            <li className="about-footer_item">
              <a href="">about</a>
            </li>
            <li className="about-footer_item">
              <a href="">Press</a>
            </li>
            <li className="about-footer_item">
              <a href="">Contact</a>
            </li>
            <li className="about-footer_item">
              <a href="">Feedback</a>
            </li>
            <li className="about-footer_item">
              <a href="">Brend Assets</a>
            </li>
            <li className="about-footer_item">
              <a href="">Status</a>
            </li>
          </ul>
        </div>
        <div className="d-flex platform-footer align-items-center">
          <ul>
            <li className="about-footer_item">
              <p>Platform</p>
            </li>
            <li className="about-footer_item">
              <a href="">Android</a>
            </li>
            <li className="about-footer_item">
              <a href="">iPhone</a>
            </li>
            <li className="about-footer_item">
              <a href="">Web</a>
            </li>
            <li className="about-footer_item">
              <a href="">Windows</a>
            </li>
          </ul>
        </div>
        <div className="d-flex platform-footer align-items-center">
          <ul>
            <li className="about-footer_item">
              <p>Info</p>
            </li>
            <li className="about-footer_item">
              <a href="">Membership</a>
            </li>
            <li className="about-footer_item">
              <a href="">Photography Terms</a>
            </li>
            <li className="about-footer_item">
              <a href="">About</a>
            </li>
            <li className="about-footer_item">
              <a href="">FAQ</a>
            </li>
            <li className="about-footer_item">
              <a href="">Terms of Use</a>
            </li>
            <li className="about-footer_item">
              <a href="">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="d-flex platform-footer align-items-center">
          <ul>
            <li className="about-footer_item">
              <p>Follow</p>
            </li>
            <li className="about-footer_item">
              <a href="">Threads</a>
            </li>
            <li className="about-footer_item">
              <a href="">Instagram</a>
            </li>
            <li className="about-footer_item">
              <a href="">Bluesky</a>
            </li>
            <li className="about-footer_item">
              <a href="">Mastodon</a>
            </li>
            <li className="about-footer_item">
              <a href="">LinkedIn</a>
            </li>
          </ul>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Glass Photo.
          <br /> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
