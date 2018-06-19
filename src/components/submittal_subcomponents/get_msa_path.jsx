import React, { Component } from "react";
const { dialog } = require("electron").remote;
const path = require("path");
const ipcRenderer = require("electron").ipcRenderer;

class GetMSAPath extends Component {
  constructor(props) {
    super(props);
    this.state = { msaName: null };
  }

  getFilePath = () => {
    var msaPathOriginal = dialog.showOpenDialog()[0];
    var msaName = msaPathOriginal.replace(/^.*[\\\/]/, "");
    var msaPath = path.join(process.cwd(), ".data", msaName);
    this.props.updateJobInfo("msaPathOriginal", msaPathOriginal);
    this.props.updateJobInfo("msaName", msaName);
    this.props.updateJobInfo("msaPath", msaPath);
    this.setState({ msaName: msaName });
    // Send a message to the main process so that the input file is moved to the .data folder as soon as it's uploaded.
    ipcRenderer.send("moveMSA", {
      msaPathOriginal: msaPathOriginal,
      msaPath: msaPath
    });
  };

  render() {
    return (
      <div className="upload-div">
        <div className="row">
          <div className="col-2">
            <button onClick={this.getFilePath}>Choose File</button>
          </div>
          {this.state.msaName ? <p>{this.state.msaName}</p> : null}
        </div>
      </div>
    );
  }
}

module.exports.GetMSAPath = GetMSAPath;
