import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="form">
        <h2 className="form-message">Create your account</h2>

        <form className="account-form" onSubmit={this.handleSubmit}>
          <div className="form-info">
            <label className="form-label" htmlFor="firstName">
              First Name
            </label>
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.firstName}
              type="text"
              name="firstName"
              placeholder="Enter your first name"
            />
            <label className="form-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.lastName}
              type="text"
              name="lastName"
              placeholder="Enter your last name"
            />
            <label className="form-label" htmlFor="jobTitle">
              Job Title
            </label>
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.jobTitle}
              type="text"
              name="jobTitle"
              placeholder="Enter your job title"
            />
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <button className="submit-btn">
              <span className="noselect">Submit</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignup);
