import "./style.scss";
import { Link } from "react-router-dom";
import mainLogo from "../../img/Jobster logo.jpeg";
import { ArrowDown, Friends, HomeActive, Home, FriendsActive } from "../../svg";
import UserMenu from "./userMenu";
import { useState } from "react";

export default function Header({ page }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <header>
      <div className="header_left">
        <Link to="/home" className="header_logo">
          <div className="circle">
            <img className="Logo" src={mainLogo} alt="" />
          </div>
        </Link>
      </div>
      <div className="header-middle">
        <Link
          to="/home"
          className={`middle_icon ${page === "home" && "active"}`}
        >
          {page === "home" ? <HomeActive /> : <Home />}
        </Link>
        <Link
          to="/messenger"
          className={`middle_icon hover1 ${page === "messenger" && "active"}`}
        >
          {page === "messenger" ? <FriendsActive /> : <Friends />}
        </Link>
        <Link to="/update-profile">
          <span className="profile_link">
            {localStorage.getItem("firstname")}{" "}
            {localStorage.getItem("lastname")}
          </span>
        </Link>

        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
        >
          <div
            onClick={() => {
              setShowUserMenu(!showUserMenu);
            }}
          >
            <ArrowDown />
            {showUserMenu && <UserMenu />}
          </div>
        </div>
      </div>
      <div className="header_right"></div>
    </header>
  );
}
