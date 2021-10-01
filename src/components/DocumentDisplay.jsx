import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const dayjs = require("dayjs");
require("dayjs/locale/en");
//var advancedFormat = require("dayjs/plugin/advancedFormat");
//var LocalizedFormat = require("dayjs/plugin/localizedFormat");
//var utc = require("dayjs/plugin/utc");
//var timezone = require("dayjs/plugin/timezone");
//dayjs.extend(utc);
//dayjs.extend(timezone);
//dayjs.extend(advancedFormat);
//dayjs.extend(LocalizedFormat);
//var relativeTime = require("dayjs/plugin/relativeTime");
//dayjs.extend(relativeTime);

export class DocumentDisplay extends Component {
  state = {
    selectedDocument: null,
    documents: [],
    patients: [],
  };

  formRef = React.createRef();

  //launched automatically lors du premier page load AFTER the first render
  componentDidMount() {
    apiHandler // axios===promise
      .getPatientDocuments(this.props.match.params.id)
      .then((documents) => {
        this.setState({ documents });
      })
      .catch((err) => {
        console.log(err);
      });
    apiHandler
      .getPatientProfile(this.props.match.params.id)
      .then((patients) => {
        this.setState({ patients });
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
      <div className="table-page-wrapper">
        <div className="doc-display-table">
          <h2 className="table-header">
            {`Patient Profile: ${this.state.patients.firstName} ${this.state.patients.lastName}`}
          </h2>
          <table ref={this.formRef}>
            <thead>
              <tr>
                <th className="doc-display-date">Date</th>
                <th className="doc-display-doc-type">Document Type</th>
                <th className="doc-display-upload-by">Uploaded By</th>
                <th className="doc-display-doc-notes">Notes</th>
                <th className="doc-display-doc">File</th>
                <th className="doc-display-doc-edit">Edit</th>
                <th className="doc-display-doc-delete">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.documents &&
                this.state.documents.map((document) => {
                  return (
                    <tr key={document._id}>
                      <td>{dayjs(`${document.date}`).format("DD-MM-YYYY")}</td>
                      <td>{document.docType}</td>
                      <td>{document.uploadedBy}</td>
                      <td>{document.notes}</td>
                      <td>
                        <a
                          className="display-doc-btns"
                          href={document.document}
                        >
                          <FontAwesomeIcon icon="file-upload" />
                        </a>
                      </td>
                      <td>
                        <Link to={`/UpdateDocument/${document._id}`}>
                          <button className="display-doc-btns">
                            <FontAwesomeIcon icon="edit" />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="display-doc-btns"
                          onClick={() => {
                            this.handleDelete(document._id);
                          }}
                        >
                          <FontAwesomeIcon icon="trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Link to={`/CreateDocument/${this.props.match.params.id}`}>
            <button className="doc-add-file-btn">Add File</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(DocumentDisplay);
