import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserMenu() {
  const [targetrole, setTargetRole] = useState("");
  const [userAccountId, setUserId] = useState(localStorage.getItem("userId"));

  const id = localStorage.getItem("userId");
  axios.get(`http://localhost:5050/api/get-profile-data/${id}`).then((res) => {
    console.log(res.data);
    const {
      firstname,
      lastname,
      email,
      github_profile,
      linkedin_profile,
      target_role,
      target_company,
      resume,
    } = res.data;

    console.log("User Menu: " + res.data.target_role);
    setTargetRole(res.data.target_role);
  });

  return (
    <div className="mmenu">
      <div className="mmenu-col">
        <Link to="/create-profile">
          <div className="meenu_span1 hover1">Create Profile</div>
        </Link>
        <Link to={`/target-role/${targetrole}`}>
          <div className="meenu_span1 hover1">Find Your Match</div>
        </Link>
        <Link to="/">
          <div className="meenu_span1 hover1">Log Out</div>
        </Link>
        <Link to={`/delete-account/${userAccountId}`}>
          <div className="meenu_span1 hover1">Delete Account</div>
        </Link>
      </div>
    </div>
  );
}
