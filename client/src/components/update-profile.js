import React, { Component } from "react";
import axios from "axios";
import "./update.scss";

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      firstname: "",
      lastname: "",
      email: "",
      github_profile: "",
      linkedin_profile: "",
      target_role: "",
      target_company: "",
      resume: [],
    };
    this.createProfile = this.createProfile.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5050/api/get-profile-data/${this.state.userId}`)
      .then((res) => {
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
        this.setState({
          firstname,
          lastname,
          email,
          github_profile,
          linkedin_profile,
          target_role,
          target_company,
          resume,
        });
      });
  }
  createProfile(event) {
    event.preventDefault();
    const {
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

    axios.put(
      `http://localhost:5050/api/update-profile/${this.state.userId}`,
      newProfileDetails
    );
  }

  render() {
    return (
      <section className="test3">
        <div className="auth-form-container">
          <h2>Update Profile</h2>
          <form className="login-form" onSubmit={this.createProfile}>
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstname}
              readOnly
            />
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.lastname}
              readOnly
            />
            <label>Email Id</label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              readOnly
            />
            <label>GitHub Profile</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter github url"
              value={this.state.github_profile}
              onChange={(e) =>
                this.setState({ github_profile: e.target.value })
              }
            />
            <label>LinkedIn Profile</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter linkedin url"
              value={this.state.linkedin_profile}
              onChange={(e) =>
                this.setState({ linkedin_profile: e.target.value })
              }
            />
            <label>Target Role</label>
            <input
              type="string"
              className="form-control"
              placeholder="Enter target role"
              value={this.state.target_role}
              required
              onChange={(e) => this.setState({ target_role: e.target.value })}
            />
            <label>Target Company</label>
            <input
              type="string"
              className="form-control"
              placeholder="Enter target company"
              value={this.state.target_company}
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

            <button type="submit" className="btn-primary">
              {" "}
              Update Profile{" "}
            </button>
          </form>
        </div>
      </section>
    );
  }
}
