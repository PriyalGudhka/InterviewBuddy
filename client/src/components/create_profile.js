import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./create_profile.scss";

export default class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: localStorage.getItem("userId"),
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname"),
      email: localStorage.getItem("email"),
      github_profile: "",
      linkedin_profile: "",
      target_role: "",
      target_company: "",
      resume: [],
    };
    this.createProfile = this.createProfile.bind(this);
  }
  createProfile(event) {
    event.preventDefault();
    const {
      _id,
      firstname,
      lastname,
      email,
      github_profile,
      linkedin_profile,
      target_role,
      target_company,
      resume,
    } = this.state;
    console.log(
      firstname,
      lastname,
      email,
      github_profile,
      linkedin_profile,
      target_role,
      target_company,
      resume
    );

    if (!target_role || !target_company) {
      toast.error("Please fill all the required fields");
    } else {
      // localStorage.setItem('targetRole', target_role);
      // localStorage.setItem('_id', _id);

      toast.success("Your Profile has been successfully created!");

      var formdata = new FormData();
      let fileName;

      formdata.append("firstname", firstname);
      formdata.append("lasttname", lastname);
      formdata.append("email", email);
      formdata.append("github_profile", github_profile);
      formdata.append("linkedin_profile", linkedin_profile);
      formdata.append("target_role", target_role);
      formdata.append("target_company", target_company);
      if (resume) {
        formdata.append("resume", resume);
        fileName = resume.name;
        // const fileName = Date.now()+
      }

      const newProfileDetails = {
        firstname,
        lastname,
        email,
        github_profile,
        linkedin_profile,
        target_role,
        target_company,
      };

      newProfileDetails.resume = fileName;

      // axios.put(`http://localhost:5050/api/create-profile/${this.state._id}`, newProfileDetails)

      axios
        .put(
          `http://localhost:5050/api/create-profile/${this.state._id}`,
          newProfileDetails
        )
        .then((response) => {
          window.setTimeout(function () {
            // Move to a new location or you can do something else
            window.location.href = "http://localhost:3000/home";
          }, 5000);
        });

      // .then( response => {
      //     console.log("Test resonse"+response);
      //     // localStorage.setItem('_id', response.data._id);

      //   })
    }
  }

  render() {
    return (
      <section className="test3">
        <div className="auth-form-container">
          <h2>Create Profile</h2>
          <form className="login-form" onSubmit={this.createProfile}>
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={localStorage.getItem("firstname")}
              readOnly
            />
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={localStorage.getItem("lastname")}
              readOnly
            />
            <label>Email Id</label>
            <input
              type="text"
              className="form-control"
              value={localStorage.getItem("email")}
              readOnly
            />
            <label>GitHub Profile</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter github url"
              onChange={(e) =>
                this.setState({ github_profile: e.target.value })
              }
            />
            <label>LinkedIn Profile</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter linkedin url"
              onChange={(e) =>
                this.setState({ linkedin_profile: e.target.value })
              }
            />
            <label>Target Role</label>
            <input
              type="string"
              className="form-control"
              placeholder="Enter target role"
              required
              onChange={(e) => this.setState({ target_role: e.target.value })}
            />
            <label>Target Company</label>
            <input
              type="string"
              className="form-control"
              placeholder="Enter target company"
              required
              onChange={(e) =>
                this.setState({ target_company: e.target.value })
              }
            />
            <label>Resume</label>
            <input
              type="file"
              className="form-control"
              placeholder="Upload Resume"
              onChange={(e) => {
                let resume = e.target.files;
                this.setState({ resume: resume[0] });
              }}
            />
            {/* <Link to='/target-role/:target_role'> */}
            <button type="submit" className="btn-primary">
              {" "}
              Create Profile <ToastContainer />{" "}
            </button>
            {/* </Link> */}
          </form>
        </div>
      </section>
    );
  }
}
