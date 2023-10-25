import React, { Component, useState } from "react";
import axios from "axios";
import "./filter.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class FilterCriteria extends Component {
  constructor(props) {
    super(props);

    var url_string = window.location.href;
    var url = new URL(url_string);
    var searchRole = /[^/]*$/.exec(url)[0];

    this.state = {
      target_role: searchRole,
      disable: false,
      setConnectionMenu: false,
      connections: false,
      following: false,
      requestSent: false,
      requestReceived: false,
      buttonText: "Follow",
    };
    this.filterCriteria = this.filterCriteria.bind(this);
    this.sendConnectionReq = this.sendConnectionReq.bind(this);
  }

  filterCriteria(event) {
    event.preventDefault();

    const id = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5050/api/get-profile-data/${id}`)
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
          loginProfileDetails: res.data,
        });
      });

    const { target_role } = this.state;

    axios
      .get(`http://localhost:5050/api/target-role/${target_role}`)
      .then((res) => {
        let tmpArray = [];
        for (var i = 0; i < res.data.length; i++) {
          tmpArray.push(res.data[i]);
        }

        this.setState({
          matchingPofileDetails: tmpArray,
        });
      });
  }

  sendConnectionReq(event, id) {
    event.preventDefault();
    try {
      console.log("new User id: " + id);

      const { data } = axios.put(
        `http://localhost:5050/api/sendConnectionRequest/${id}`,
        { _id: localStorage.getItem("userId") }
      );

      this.setState({
        buttonText: "Following",
      });

      return "ok";
    } catch (error) {
      return error.response.data.message;
    }
    //   };
  }

  sendMessage(event, id) {
    event.preventDefault();

    console.log("Send Message method new User id: " + id);

    window.location.href = "/messenger";
  }

  render() {
    return (
      <div className="filter">
        <section className="serach-bg">
          <div className="auth-form-container3">
            <h2>Search your buddy</h2>
            <form className="login-form" onSubmit={this.filterCriteria}>
              <button type="submit" className="btn-search">
                {" "}
                Search by Target Role <ToastContainer />{" "}
              </button>
            </form>
            {/* {this.state.matchingPofileDetails && this.state.matchingPofileDetails.filter(prof => prof._id !== localStorage.getItem('userId')).map((profileDetails, index) => (
                    <tr key={index}>
                        <th scope="row">{profileDetails.id}</th>
                        <td>{profileDetails.firstname + " " + profileDetails.lastname}</td><br />
                        <td>Email: {profileDetails.email}</td><br />
                        <td><details>
                            <summary>View More</summary>
                            <td>Target Role: {profileDetails.target_role}</td><br />
                            <td>Target Company: {profileDetails.target_company}</td>
                        </details>
                        </td>

                        <td> <button onClick={(event) => { this.sendConnectionReq(event, profileDetails._id) }}>{this.state.buttonText}</button></td>

                        <td>
                            {
                                (<button onClick={(event) => {
                                    localStorage.setItem("connectionId", profileDetails._id);
                                    this.sendMessage(event, profileDetails._id)
                                }}>Message</button>)

                            }
                        </td>

                    </tr>
                )

                )

                } */}

            {this.state.matchingPofileDetails &&
              this.state.matchingPofileDetails
                .filter((prof) => prof._id !== localStorage.getItem("userId"))
                .map((profileDetails, index) => (
                  <main className="card" key={index}>
                    <div>{profileDetails.id}</div>

                    <div className="name">
                      {profileDetails.firstname + " " + profileDetails.lastname}
                    </div>
                    <br />
                    <div className="details">
                      <details>
                        <br></br>
                        <div>Email: {profileDetails.email}</div>
                        <br />
                        <div>Target Role: {profileDetails.target_role}</div>
                        <br></br>
                        <div>
                          Target Company: {profileDetails.target_company}
                        </div>
                      </details>
                    </div>
                    <div className="conatiner">
                      <br />
                      <button
                        className="btn-send"
                        onClick={(event) => {
                          localStorage.setItem(
                            "connectionId",
                            profileDetails._id
                          );
                          this.sendMessage(event, profileDetails._id);
                        }}
                      >
                        Message
                      </button>
                    </div>
                    <div className="conatiner">
                      <button
                        className="btn-send"
                        onClick={(event) => {
                          this.sendConnectionReq(event, profileDetails._id);
                        }}
                      >
                        {this.state.buttonText}
                      </button>
                    </div>
                  </main>
                ))}
          </div>
        </section>
      </div>
    );
  }
}
