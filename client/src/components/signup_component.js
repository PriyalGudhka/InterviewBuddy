import React, { Component } from "react";
import mainLogo from "../img/Jobster logo.jpeg";
import "./header/style.scss";
import "./signup.scss";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      errors: { firstname: "", lastname: "", email: "", password: "" },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //FirstName
    if (!fields["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "Cannot be empty";
    }

    // if (typeof fields["firstname"] !== "undefined") {
    //   if (!fields["firstname"].match(/^[a-zA-Z]+$/)) {
    //     formIsValid = false;
    //     errors["firstname"] = "Only letters";
    //   }
    // }
    //LastName
    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "Cannot be empty";
    }

    // if (typeof fields["lastname"] !== "undefined") {
    //   if (!fields["lastname"].match(/^[a-zA-Z]+$/)) {
    //     formIsValid = false;
    //     errors["lastname"] = "Only letters";
    //   }
    // }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    // if (typeof fields["email"] !== "undefined") {
    //   let lastAtPos = fields["email"].lastIndexOf("@");
    //   let lastDotPos = fields["email"].lastIndexOf(".");

    //   if (
    //     !(
    //       lastAtPos < lastDotPos &&
    //       lastAtPos > 0 &&
    //       fields["email"].indexOf("@@") == -1 &&
    //       lastDotPos > 2 &&
    //       fields["email"].length - lastDotPos > 2
    //     )
    //   ) {
    //     formIsValid = false;
    //     errors["email"] = "Email is not valid";
    //   }
    // }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty";
    }
    // if (!this.state.password.length > 8) {
    //   formIsValid = false;
    //   errors["password"] = "length must be 8 characters";
    // }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const { _id, firstname, lastname, email, password } = this.state;
      console.log(firstname, lastname, email, password);
      localStorage.setItem("firstname", firstname);
      localStorage.setItem("lastname", lastname);
      localStorage.setItem("email", email);
      // localStorage.setItem('_id', _id);

      fetch("http://localhost:5050/api/registers", {
        method: "POST",
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "userRegister");
          localStorage.setItem("userId", data._id);
          window.location.href = "http://localhost:3000/sign-in";
        })
        .catch((error) => {
          if (error) throw error;
        });
    }
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  }

  render() {
    const { _id, firstname, lastname, email, password, errors } = this.state;
    return (
      <section className="test1">
        <div className="circle">
          <img className="Logo" src={mainLogo} alt="" />
        </div>
        <div className="auth-form-container1">
          <h1>Welcome to Jobster!</h1>
          <h3>Sign Up Page</h3>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <label>First name</label>
            <input
              type="text"
              name={firstname.name}
              className="form-control"
              placeholder="First name"
              onChange={(e) => this.setState({ firstname: e.target.value })}
            />
            {errors.firstname && (
              <div style={{ color: "red" }}>{errors.firstname}</div>
            )}
            <label>Last name</label>
            <input
              type="text"
              name={lastname.name}
              className="form-control"
              placeholder="Last name"
              onChange={(e) => this.setState({ lastname: e.target.value })}
            />
            {errors.lastname && (
              <div style={{ color: "red" }}>{errors.lastname}</div>
            )}
            <label>Email address</label>
            <input
              type="email"
              name={email.name}
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            <label>Password</label>
            <input
              type="password"
              name={password.name}
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}
            <div className="d-grid">
              {/* <Link to="/sign-in"> */}
              <button type="submit" className="btn-primary">
                {" "}
                Sign Up{" "}
              </button>
              {/* </Link> */}
            </div>
            <p className="forgot-password text-right">
              Already Registered? <a href="/sign-in">Sign in</a>
            </p>
          </form>
        </div>
      </section>
    );
  }
}
