import "./Nav.css";
import { Link } from "react-router-dom";

import { fetchMainPageUserThunk } from "../../redux/userSlice/slice";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../redux/store";
import {
  selectUserMain,
  selectUserMainLoading,
} from "../../redux/userSlice/selector";

import { useEffect } from "react";

import { ClipLoader } from "react-spinners";

import AvatarDropdown from "../avatarDropDown";

const Nav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserMain);
  const loading = useSelector(selectUserMainLoading);

  useEffect(() => {
    dispatch(fetchMainPageUserThunk());
  }, []);

  return (
    <div className="wrapper-nav">
      <div className="nav container">
        <ul className="nav-list left-side">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to={"/"}>
              Main page
            </Link>
          </li>
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

        <div className="nav-right-buttons align-items-center">
          <div className="inputBox_container">
            <svg
              className="search_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z"></path>
            </svg>
            <input
              className="inputBox"
              id="inputBox"
              type="text"
              placeholder="Search For Posts"
            />
          </div>
          {loading ? (
            <ClipLoader size={28} color="ffffff" />
          ) : user?.id ? (
            <AvatarDropdown {...user} />
          ) : (
            <>
              <Link to={"/sign-in"} className="auth-btn sign-in-style">
                <i className="fas fa-arrow-right button-icon"></i>
                <span className="button-text">Sign In</span>
              </Link>
              <Link to={"/sign-up"} className="auth-btn sign-up-style">
                <i className="fas fa-arrow-up button-icon"></i>
                <span className="button-text">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
