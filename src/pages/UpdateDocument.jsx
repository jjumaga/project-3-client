import React, { Component } from "react";
import FormUpdateDocument from "../components/Forms/FormUpdateDocument";
import apiHandler from "../api/apiHandler";

export class UpdateDocument extends Component {
  state = {
    documents: [],
  };

  componentDidMount() {
    apiHandler.getDocuments().then((data) => {
      this.setState({ documents: data });
    });
  }

  render() {
    return <FormUpdateDocument documents={this.state.documents} />;
  }
}

export default UpdateDocument;
