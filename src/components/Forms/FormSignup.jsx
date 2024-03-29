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
    const key = event.target.name;
    const value = event.target.value;

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
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.firstName}
              type="text"
              name="firstName"
              placeholder="First name"
            />
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.lastName}
              type="text"
              name="lastName"
              placeholder="Last name"
            />
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.jobTitle}
              type="text"
              name="jobTitle"
              placeholder="Profession"
            />
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="Password"
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
