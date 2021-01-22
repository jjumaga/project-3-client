import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";
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
      .then((documents) => {
        console.log(documents);
        this.setState({ documents });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete(documentId) {
    apiHandler
      .removeDocument(documentId)
      .then((responseFromApi) => {
        this.setState({
          documents: this.state.documents.filter(
            (document) => document._id !== documentId
          ),
        });
      })
      .catch((error) => {
        console.log(error);
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
              <th>Date</th>
              <th>Uploaded By</th>
              <th>Link</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.state.documents &&
              this.state.documents.map((document) => {
                return (
                  <tr key={document._id}>
                    <td>{document.docType}</td>
                    <td>{dayjs(`${document.date}`).format("DD/MM/YYYY")}</td>
                    <td>{document.uploadedBy}</td>
                    <td>
                      <a href={document.document}>{document.document}</a>
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
