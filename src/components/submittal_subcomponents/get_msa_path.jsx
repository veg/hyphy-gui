import React, { Component } from "react";
const { app, dialog } = require("electron").remote;
const path = require("path");
const moment = require("moment");

// Determine the environment and set the paths accordingly.
const isDev =
  process.mainModule.filename.indexOf(".app") === -1 &&
  process.mainModule.filename.indexOf(".exe") === -1;
const environment = isDev ? "development" : "production";
const dataDirectory =
  environment == "development"
    ? path.join(process.cwd(), ".data")
    : path.resolve(app.getPath("userData"));

class GetMSAPath extends Component {
  constructor(props) {
    super(props);
    this.state = { msaName: null };
  }

  getFilePath = () => {
    let msaPathOriginal = dialog.showOpenDialog()[0];
    let msaName = msaPathOriginal.replace(/^.*[\\\/]/, "");
    let unixTimeStamp = moment().format("X");
    let msaPath = path.join(dataDirectory, msaName + "_" + unixTimeStamp);
    this.props.updateJobInfo("msaPathOriginal", msaPathOriginal);
    this.props.updateJobInfo("msaName", msaName);
    this.props.updateJobInfo("msaPath", msaPath);
    this.setState({ msaName: msaName });
    // Send a message to the main process so that the input file is moved to the dataDirectory as soon as it's uploaded.
    this.props.comm.send("moveMSA", {
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
