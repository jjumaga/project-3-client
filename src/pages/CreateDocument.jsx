import React, { Component } from "react";
import FormCreateDocument from "../components/Forms/FormCreateDocument";

export class CreateDocument extends Component {
  state = {
    documents: this.props.documents,
  };

  render() {
    return (
      <div>
        <FormCreateDocument documents={this.props.documents} />
      </div>
    );
  }
}

export default CreateDocument;
