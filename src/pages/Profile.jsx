import React, { Component } from "react";
import "../styles/profile.css";
import apiHandler from "../api/apiHandler";
import UserContext from "../components/Auth/UserContext";
import DocumentDisplay from "../components/DocumentDisplay";
import { withRouter } from "react-router";

export class Profile extends Component {
  static contextType = UserContext;
  state = {
    documents: [],
    patients: [],
  };

  componentDidMount() {
    apiHandler.getDocuments().then((data) => {
      this.setState({ documents: data });
    });
    apiHandler.getPatients().then((data) => {
      this.setState({ patients: data });
    });
  }

  handleDocumentUpdate = (updatedDocument) => {
    const documents = [...this.state.documents].map((document) =>
      document._id === updatedDocument._id ? updatedDocument : document
    );
    this.setState({ documents });
  };

  handleClose = () => {
    this.setState({ selectedDocument: null });
  };

  render() {
    //console.log(this.state.patients);
    return (
      <DocumentDisplay
        patients={this.state.patients}
        documents={this.state.documents}
        handleClose={this.handleClose}
        onDocumentUpdate={this.handleDocumentUpdate}
      />
    );
  }
}

export default withRouter(Profile);
