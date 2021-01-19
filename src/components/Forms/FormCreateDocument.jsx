import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { withRouter } from "react-router";
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
      event.target.type == "file" ? event.target.files[0] : event.target.value;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    // data.document = this.imageRef.current.files[0]
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    //// Function implemented by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041
    apiHandler
      .createDocument(fd)
      .then((apiResponse) => {
        this.props.history.push("/profile");
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
      <form onSubmit={this.handleSubmit}>
        <div>
          <label class="desc" id="title1" htmlFor="docType">
            Document Type
          </label>
          <div>
            <input
              id="Field1"
              onChange={this.handleChange}
              value={this.state.docType}
              type="text"
              name="docType"
            />
          </div>
        </div>

        <div>
          <label class="desc" id="title2" htmlFor="date">
            Date
          </label>
          <div>
            <input
              id="Field2"
              onChange={this.handleChange}
              value={this.state.date}
              type="date"
              name="date"
            />
          </div>
        </div>

        <div>
          <label class="desc" id="title3" htmlFor="uploadedBy">
            Uploaded By
          </label>
          <div>
            <input
              id="Field3"
              onChange={this.handleChange}
              value={this.state.uploadedBy}
              type="text"
              name="uploadedBy"
            />
          </div>
        </div>

        <div>
          <label class="desc" id="title4" htmlFor="document">
            Upload Document
          </label>
          <div>
            <input
              id="Field4"
              onChange={this.handleChange}
              // ref={this.imageRef}
              type="file"
              name="document"
            />
          </div>
        </div>

        <div>
          <label class="desc" id="title5" htmlFor="notes">
            Notes
          </label>
          <div>
            <textarea
              id="Field5"
              onChange={this.handleChange}
              value={this.state.notes}
              name="notes"
              spellcheck="true"
            ></textarea>
          </div>
        </div>

        <div>
          <div>
            <button>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default withUser(withRouter(FormCreateDocument));
