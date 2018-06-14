import React, { Component } from "react";
const ipcRenderer = require("electron").ipcRenderer;

class ParseAndValidateMSA extends Component {
  componentDidMount() {
    this.setEventListeners();
  }

  setEventListeners = () => {
    ipcRenderer.once("validationComplete", (event, arg) => {
      if (arg.valid) {
        // Add info from the datareader.hbl output to the jobInfo.
        this.props.updateJobInfo("tree", {
          neighbor_joining: arg.message.FILE_INFO.nj,
          user_supplied: arg.message.FILE_PARTITION_INFO[0].usertree
          //partition_info: arg.message.FILE_PARTITION_INFO
        });
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
            ipcRenderer.send("parseAndValidateMSA", {
              jobInfo: this.props.jobInfo
            })
          }
        >
          Next
        </button>
      </div>
    );
  }
}

module.exports.ParseAndValidateMSA = ParseAndValidateMSA;
