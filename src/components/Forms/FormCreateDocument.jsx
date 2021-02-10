import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../tools.js";
import "../../styles/form.css";

class FormCreateDocument extends Component {
  //static contextType = UserContext;

  state = {
    docType: "",
    date: "",
    uploadedBy: "",
    document: "",
    notes: "",
  };

  imageRef = React.createRef();

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    data.patient = this.props.match.params.id;
    // data.document = this.imageRef.current.files[0]
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    //// Function implemented by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041
    apiHandler
      .createDocument(fd)
      .then(() => {
        this.props.history.push("/profile/" + this.props.match.params.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    //if (this.context.user) {
    //  return <Redirect to="/" />;
    //}
    return (
      <div className="form">
        <h2 className="form-message">Add patient information</h2>

        <form className="account-form" onSubmit={this.handleSubmit}>
          <div className="form-info">
            <label className="form-label" htmlFor="docType">
              Document Type
            </label>

            <select
              className="form-input"
              onChange={this.handleChange}
              value={this.state.docType}
              name="docType"
            >
              <option value="Select">- Please Select an Option Below -</option>
              <option value="Prescription">Prescription</option>
              <option value="Test Results">Test Results</option>
              <option value="X-ray/MRI/CT Scan">X-ray/MRI/CT Scan</option>
              <option value="Daily Journal">Daily Journal</option>
              <option value="Admistrative Reocrds">
                Administrative Records
              </option>
              <option value="Patient Information">Patient Information</option>
              <option value="Other">
                Other - Give details in notes section
              </option>
            </select>

            <label className="form-label" htmlFor="date">
              Date
            </label>

            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.date}
              type="date"
              name="date"
            />

            <label className="form-label" htmlFor="uploadedBy">
              Uploaded By
            </label>

            <input
              className="form-input"
              onChange={this.handleChange}
              value={this.state.uploadedBy}
              type="text"
              name="uploadedBy"
            />

            <label className="form-label" htmlFor="document">
              Upload Document
            </label>

            <input
              className="form-input"
              onChange={this.handleChange}
              // value={this.state.document}
              ref={this.imageRef}
              type="file"
              name="document"
            />

            <label className="form-label" htmlFor="notes">
              Notes
            </label>

            <textarea
              className="form-input"
              onChange={this.handleChange}
              value={this.state.notes}
              name="notes"
              spellCheck="true"
            ></textarea>

            <button className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withUser(withRouter(FormCreateDocument));
