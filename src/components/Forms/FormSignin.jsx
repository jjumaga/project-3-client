import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
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
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        //this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="form">
        <h2 className="form-message">Sign in</h2>

        <form
          className="account-form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div className="form-info">
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="form-input"
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

export default withRouter(FormSignin);
