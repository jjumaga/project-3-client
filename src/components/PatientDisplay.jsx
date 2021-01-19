import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";

export default class PatientDisplay extends Component {
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
  handleClick;

  render() {
    return (
      <div>
        <h2>Patient Documents</h2>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date of Birth</th>
              <th>Social Security Number</th>
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
                    <td>
                      <button onClick={this.handleClick}>
                        Add to my Patient List
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
