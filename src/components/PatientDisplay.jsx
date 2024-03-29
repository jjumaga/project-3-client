import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "./Auth/withUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/table.css";

class PatientDisplay extends Component {
  state = {
    selectedPatient: null,
    patients: [],
  };

  //launched automatically lors du premier page load AFTER the first render
  componentDidMount() {
    apiHandler // axios===promise
      .getPatients(this.props.patients)
      .then((patients) => this.setState({ patients })) //because my state is documents, I need to tell it to equal document (what I recuper from my DB)
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick(patientId) {
    apiHandler
      .addNewPatient(patientId)
      .then((user) => {
        console.log(user);
        this.props.context.setUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayAddButton(patientId) {
    if (this.props.context.user.patients.includes(patientId))
      return <div className="already-added-msg">Already added</div>;
    else {
      return (
        <button
          className="table-btns"
          onClick={() => this.handleClick(patientId)}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      );
    }
  }

  displayRemoveButton(patientId) {
    if (this.props.context.user.patients.includes(patientId))
      return (
        <button onClick={() => this.handleDelete(patientId)}>Remove</button>
      );
  }

  //deleteItem = (itemId) => {
  //  apiHandler.removeDocument(itemId).then(() => {
  //    const userItems = [...this.state.userItems].filter(
  //      (item) => item._id !== itemId);
  //    this.setState({ userItems });
  //  });
  //};

  render() {
    return (
      <div className="table-page-wrapper">
        <div className="table">
          <h1 className="table-header">Patients</h1>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date of Birth (DD/MM/YYY)</th>
                <th>Social Security Number</th>
                <th className="patients-header-profile">Add Patient</th>
              </tr>
            </thead>
            <tbody>
              {this.props.patients[0] &&
                this.props.patients.map((patient) => {
                  return (
                    <tr key={patient._id}>
                      <td>{`${patient.firstName} ${patient.lastName}`}</td>
                      <td>{patient.birthDate}</td>
                      <td>{patient.socialSecurityNumber}</td>
                      <td>{this.displayAddButton(patient._id)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withUser(PatientDisplay);

//<td>{this.displayRemoveButton(patient._id)}</td>
