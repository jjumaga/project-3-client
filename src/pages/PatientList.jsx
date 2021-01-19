import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import PatientDisplay from "../components/PatientDisplay";
import { withRouter } from "react-router";
import UserContext from "../components/Auth/UserContext";

export class PatientList extends Component {
  static contextType = UserContext;
  state = {
    patients: [],
  };

  componentDidMount() {
    apiHandler.getPatients().then((data) => {
      this.setState({ patients: data });
    });
  }

  handleClose = () => {
    this.setState({ selectedPatient: null });
  };

  render() {
    return (
      <PatientDisplay
        patients={this.state.patients}
        handleClose={this.handleClose}
      />
    );
  }
}

export default withRouter(PatientList);
