import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../tools.js";
//import UploadWidget from "../UploadWidget";
//import Button from "../Button";
import { withRouter } from "react-router";
import "../../styles/form.css";

class FormUpdateDocument extends Component {
  static contextType = UserContext;
  state = {
    documents: this.props.documents,
    httpResponse: null,
  };

  formRef = React.createRef();

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    //// Function implemented by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041
    apiHandler
      .updateDocument(this.props.match.params.id, fd)
      .then((data) => {
        console.log("data", data);
        this.props.history.push("/profile/" + data.patient);
        //clear form
        //this.props.onDocumentUpdate(data);
        this.setState({
          documents: data,
        });
        //  httpResponse: {
        //    status: "success",
        //    message: "Item successfully updated.",
        //  },
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ image: file });
  };

  componentDidMount() {
    //launched automatically lors du premier page load AFTER the first render
    const documentId = this.props.match.params.id;
    apiHandler // axios===promise
      .getOneDocument(documentId)
      .then((document) => this.setState({ documents: document })) //because my state is documents, I need to tell it to equal document (what I recuper from my DB)
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      this.state.documents && (
        <form ref={this.formRef} onSubmit={this.handleSubmit}>
          <h2>Edit Item</h2>

          <div>
            <label className="label" htmlFor="docType">
              Document Type
            </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="docType"
              defaultValue={this.state.documents.docType}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              onChange={this.handleChange}
              type="date"
              name="date"
              defaultValue={this.state.documents.date}
            />
          </div>

          <div>
            <label htmlFor="uploadedBy">Uploaded By</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="uploadedBy"
              defaultValue={this.state.documents.uploadedBy}
            />
          </div>

          <div>
            <label htmlFor="document">Document</label>
            <input
              onChange={this.handleChange}
              type="file"
              name="document"
              defaultValue={this.state.documents.document}
            />
          </div>

          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              onChange={this.handleChange}
              name="notes"
              defaultValue={this.state.documents.notes}
            ></textarea>
          </div>

          <button>Edit Item</button>
        </form>
      )
    );
  }
}

export default withRouter(FormUpdateDocument);
