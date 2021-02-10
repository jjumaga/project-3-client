import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
//import background from "../banner.jpg";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="nav-bar">
      <div className="logo">
        <NavLink exact to="/">
          <h3 className="bottom-border">HealthHub</h3>
        </NavLink>
      </div>

      <ul className="nav-ul">
        {context.isLoggedIn && (
          <React.Fragment>
            <li className="welcome-msg">
              Welcome, {context.user && context.user.email}
            </li>

            <li className="hover-style">
              <NavLink to="/PatientList">
                <span className="noselect">Find a Patient</span>
              </NavLink>
            </li>

            <li className="hover-style">
              <NavLink to="/MyPatients">
                <span className="noselect">My Patients</span>
              </NavLink>
            </li>

            <li className="hover-style">
              <p className="noselect" onClick={handleLogout}>
                Logout
              </p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li className="hover-style">
              <NavLink to="/signin">
                <span>Log In</span>
              </NavLink>
            </li>

            <li className="hover-style">
              <NavLink to="/signup">
                <span>Create Account</span>
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
