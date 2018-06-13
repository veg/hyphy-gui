import React, { Component } from "react";
const ipcRenderer = require("electron").ipcRenderer;

class ValidateFile extends Component {
  componentDidMount() {
    this.setEventListeners();
  }

  setEventListeners = () => {
    ipcRenderer.on("validationComplete", (event, arg) => {
      if (arg.valid) {
        this.props.changeJobSubmittalState("filePassedValidation", arg.valid);
      } else {
        alert(arg.message);
      }
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() =>
            ipcRenderer.send("validateMSA", { jobInfo: this.props.jobInfo })
          }
        >
          Next
        </button>
      </div>
    );
  }
}

module.exports.ValidateFile = ValidateFile;
