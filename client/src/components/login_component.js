import React, { Component } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: { email: "", password: "" },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //FirstName
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    // if (typeof fields["firstname"] !== "undefined") {
    //   if (!fields["firstname"].match(/^[a-zA-Z]+$/)) {
    //     formIsValid = false;
    //     errors["firstname"] = "Only letters";
    //   }
    // }
    //LastName
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const { email, password } = this.state;
      console.log(email, password);

      fetch("http://localhost:5050/api/login-user", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
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
          localStorage.setItem("firstname", data.user.firstname);
          localStorage.setItem("lastname", data.user.lastname);
          localStorage.setItem("userId", data.user._id);
          window.location.href = "http://localhost:3000/home";
          redirect("/home");
        });
    }
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <section className="test2">
        <div className="auth-form-container2">
          <h1>Welcome to Jobster!</h1>
          <h2>Sign In Page</h2>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                {" "}
                Remember me{" "}
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary"
              onClick={this.handleSubmit}
            >
              {" "}
              Submit
            </button>
          </form>
          <p className="forgot-password text-right">
            {" "}
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </section>
    );
  }
}

export default Login;
