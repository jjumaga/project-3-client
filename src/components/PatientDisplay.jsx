import React, { Component } from "react";
//import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import { withUser } from "./Auth/withUser";

import "../styles/table.css";

const dayjs = require("dayjs");
require("dayjs/locale/en");
var advancedFormat = require("dayjs/plugin/advancedFormat");
var LocalizedFormat = require("dayjs/plugin/localizedFormat");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(LocalizedFormat);
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

class PatientDisplay extends Component {
  state = {
    selectedPatient: null,
    patients: [],
  };

  //launched automatically lors du premier page load AFTER the first render
  //componentDidMount() {
  //  apiHandler // axios===promise
  //    .getPatients(patient)
  //    .then((patients) => this.setState({ patients })) //because my state is documents, I need to tell it to equal document (what I recuper from my DB)
  //    .catch((err) => {
  //      console.log(err);
  //    });
  //}

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
      return <div>Already added to your patients</div>;
    else {
      return (
        <button
          className="table-btns"
          onClick={() => this.handleClick(patientId)}
        >
          Add to My Patients
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
                <th>Date of Birth</th>
                <th>Social Security Number</th>
                <th>Add Patient</th>
              </tr>
            </thead>
            <tbody>
              {this.props.patients[0] &&
                this.props.patients.map((patient) => {
                  return (
                    <tr key={patient._id}>
                      <td>{`${patient.firstName} ${patient.lastName}`}</td>
                      <td>
                        {dayjs(`${patient.birthDate}`).format("DD/MM/YYYY")}
                      </td>
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
