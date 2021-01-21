import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";

export class DocumentDisplay extends Component {
  state = {
    selectedDocument: null,
    documents: [],
  };

  //getpatientdocuments
  //launched automatically lors du premier page load AFTER the first render
  componentDidMount() {
    apiHandler // axios===promise
      .getPatientDocuments(this.props.match.params.id)
      .then((documents) => this.setState({ documents }))
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete(documentId) {
    apiHandler
      .removeDocument(documentId)
      .then(() => {
        this.setState({
          documents: this.props.documents.filter(
            (document) => document._id !== documentId
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.props);
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
                    <td>
                      <button
                        onClick={() => {
                          this.handleDelete(document._id);
                        }}
                      >
                        Delete File
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Link to={`/CreateDocument/${this.props.match.params.id}`}>
          <button>Add File</button>
        </Link>
      </div>
    );
  }
}

export default withRouter(DocumentDisplay);
