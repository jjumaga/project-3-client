import React, { Component } from "react";
//import Button from "../Button";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";

export class DocumentDisplay extends Component {
  state = {
    selectedDocument: null,
    documents: [],
  };

  //getDocuments = (selectedDocument) => {
  //  this.setState({ selectedDocument });
  //};

  //launched automatically lors du premier page load AFTER the first render
  componentDidMount() {
    apiHandler // axios===promise
      .getDocuments(document)
      .then((documents) => this.setState({ documents })) //because my state is documents, I need to tell it to equal document (what I recuper from my DB)
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Patient Documents</h2>
        <table>
          <thead id="this">
            <tr>
              <th>Document Type</th>
              <th>Date Uploaded</th>
              <th>Uploaded By</th>
              <th>Link</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.props.documents[0] &&
              this.props.documents.map((document) => {
                return (
                  <tr key={document._id}>
                    <td>{document.docType}</td>
                    <td>{document.date}</td>
                    <td>{document.uploadedBy}</td>
                    <td>
                      <button>{document.document}</button>
                    </td>
                    <td>{document.notes}</td>
                    <td>
                      <Link to={`/UpdateDocument/${document._id}`}>
                        <button>Edit File</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Link to={"/CreateDocument"}>
          <button>Add File</button>
        </Link>
      </div>
    );
  }
}

export default DocumentDisplay;
