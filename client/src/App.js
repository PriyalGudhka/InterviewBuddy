import React, { useEffect } from "react";
import "./App.scss";
import "./components/header/style.scss";
import "./components/login.scss";
import "./components/signup.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import CreateProfile from "./components/create_profile";
import Home from "./pages/home";
import UpdateProfile from "./components/update-profile";
import FilterCriteria from "./components/filter_conditions";
import CreatePostPopup from "./components/createPostPopup";
import Messenger from "./pages/home/messenger/Messenger";
import DeleteUserAccount from "./components/delete_user_account";

import axios from "axios";

function App() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async (loading, error, posts) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5050/post/getAllPosts",
        {
          loading: false,
          posts: [],
          error: "",
        }
      );

      setPosts(data);
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <div>
      {visible && <CreatePostPopup setVisible={setVisible} />}
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<SignUp />} />
                <Route path="/sign-in" element={<Login />} />

                <Route path="/create-profile" element={<CreateProfile />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route
                  path="/home"
                  element={<Home setVisible={setVisible} posts={posts} />}
                />
                <Route
                  path="/target-role/:target_role"
                  element={<FilterCriteria />}
                />
                <Route path="/messenger" element={<Messenger />} />
                <Route
                  path="/delete-account/:id"
                  element={<DeleteUserAccount />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
