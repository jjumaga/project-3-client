import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
//import { withUser } from "../components/Auth/withUser"; //import my current user info as props
import { withRouter } from "react-router-dom";
import "../styles/myPatients.css";
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
        {this.state.patients.length === 0 && (
          <h1>You do not have any patients</h1>
        )}
        {this.state.patients.map((patient) => {
          return (
            <div className="patient-list-div">
              <section className="my-patients-section" key={patient._id}>
                <h3>{`${patient.firstName} ${patient.lastName}`}</h3>
                <p>{dayjs(`${patient.birthDate}`).format("DD/MM/YYYY")}</p>
                <button
                  className="patient-profile-btn"
                  onClick={() => {
                    this.handlePatient(patient._id);
                  }}
                >
                  Patient Profile
                </button>
              </section>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(MyPatients);

//BE - populate field of patients instead of just having Id's
//button go to patient profile - need id of patient
