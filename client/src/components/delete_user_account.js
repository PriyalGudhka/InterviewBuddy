import React, { Component } from "react";
import axios from "axios";
import "./delete.scss";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
//   import AlertTitle from "@material-ui";
import { AlertTitle } from "@mui/material";

export default class DeleteUserAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // target_role: localStorage.getItem('targetRole'),
      firstname: "",
      lastname: "",
      email: "",
      target_role: "",
      target_company: "",
    };
    this.deleteUserAccount = this.deleteUserAccount.bind(this);
    this.getProfileDetails = this.getProfileDetails.bind(this);

    this.getProfileDetails();
  }

  //Used for calling the DELETE HTTP method for removing the todo item
  deleteUserAccount(event) {
    const id = localStorage.getItem("userId");

    axios.delete(`http://localhost:5050/api/delete-account/${id}`);
    // .then((res) => {
    //     return res.redirect('/sign-up');
    // }
    // );

    window.location.href = "http://localhost:3000/sign-up";
    // console.log("User account deleted successfully!!")
  }

  getProfileDetails(event) {
    const id = localStorage.getItem("userId");
    console.log("Inside get profile details");
    axios
      .get(`http://localhost:5050/api/get-profile-data/${id}`)
      .then((res) => {
        console.log(res.data);
        const { firstname, lastname, email, target_role, target_company } =
          res.data;

        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          target_role: res.data.target_role,
          target_company: res.data.target_company,
        });
      });
  }

  render() {
    //  {this.getProfileDetails()}
    return (
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Profile Details</MDBCardTitle>
          <MDBCardText>{this.state.firstname}</MDBCardText>
          <MDBCardText>{this.state.lastname}</MDBCardText>
          <MDBCardText>{this.state.email}</MDBCardText>
          <MDBCardText>{this.state.target_role}</MDBCardText>
          <MDBCardText>{this.state.target_company}</MDBCardText>
          <MDBBtn onClick={this.deleteUserAccount}>Delete Account</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
