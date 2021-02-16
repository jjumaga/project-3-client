import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
//import { withUser } from "../components/Auth/withUser"; //import my current user info as props
import { withRouter } from "react-router-dom";
import "../styles/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

class MyPatients extends Component {
  state = {
    patients: [],
  };

  //after first render, this function pulls info from DB into page and sets the state
  componentDidMount() {
    apiHandler
      .getMyPatients()
      .then((user) => this.setState({ patients: user.patients }))
      .catch((err) => {
        console.log(err);
      });
  }

  handlePatient(patientId) {
    apiHandler
      .getPatientProfile(patientId)
      .then((data) => this.props.history.push("/profile/" + patientId))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.patients.length === 0 ? (
          <h1 className="table-header-my-patients">
            You do not have any patients
          </h1>
        ) : (
          <h1 className="table-header-my-patients"> My Patients</h1>
        )}
        <div className="table-page-wrapper">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date of Birth</th>
                  <th>Social Security Number</th>
                  <th className="my-patients-header-profile">
                    Patient Profile
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.patients.map((patient) => {
                  return (
                    <tr key={patient._id}>
                      <td>{`${patient.firstName} ${patient.lastName}`}</td>
                      <td>
                        {dayjs(`${patient.birthDate}`).format("DD/MM/YYYY")}
                      </td>
                      <td>{patient.socialSecurityNumber}</td>
                      <td>
                        <button
                          className="table-btns"
                          onClick={() => {
                            this.handlePatient(patient._id);
                          }}
                        >
                          <FontAwesomeIcon icon="arrow-circle-right" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MyPatients);

//BE - populate field of patients instead of just having Id's
//button go to patient profile - need id of patient
