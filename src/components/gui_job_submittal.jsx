import React, { Component } from "react";
import { JobSubmittal } from "./job_submittal.jsx"; // This will be replaced by an import from hyphy-vision when ready.
const _ = require("underscore");
const path = require("path");
const remote = require("electron").remote; // remote allows for using node modules within render process.
const electronProcess = remote.require("process");
const moment = require("moment");

/**
 * GUIJobSubmittal wraps the generic JobSubmittal component (to be impored from vision)
 * and provide the funcitionality unique to the GUI.
 */
class GUIJobSubmittal extends Component {
  constructor(props) {
    super(props);
  }

  tellMainToRunAnalysis = jobInfo => {
    /**
     * A function to send a message to the main process telling it to run a hyphy job.
     * comm sends "runAnalysis" to backend for processing.
     * A listener ("ipcMain.on") is listening for "runAnalysis" on the Main side.
     */

    // Add timeSubmitted to jobInfo.
    let timeSubmitted = moment().format();

    jobInfo["timeSubmitted"] = timeSubmitted;

    // Add jobID to jobInfo.
    jobInfo["jobID"] = [jobInfo.msaName, jobInfo.method, timeSubmitted].join(
      "_"
    );

    // Add jsonPath to jobInfo.
    jobInfo["jsonPath"] = [
      jobInfo.msaPath,
      jobInfo.method.toUpperCase(),
      "json"
    ].join(".");

    // Add fastaPath to jobInfo.
    jobInfo["fastaPath"] = jobInfo.msaPath + ".fasta";

    // Send the message to run the job or add to the queued job list.
    if (_.isEmpty(this.props.appState.jobRunning)) {
      this.props.comm.send("runAnalysis", { jobInfo: jobInfo });
      this.props.changeAppState("page", "jobProgress");
      this.props.changeAppState("jobRunning", jobInfo);
      this.props.changeAppState("jobInFocus", jobInfo.jobID);
    } else {
      let QueuedJobsUpdated = this.props.appState.jobsQueued;
      QueuedJobsUpdated.push(jobInfo);
      this.props.changeAppState("page", "jobQueue");
      this.props.changeAppState("jobsQueued", QueuedJobsUpdated);
      this.props.changeAppState("method", null);
    }
  };

  render() {
    return (
      <JobSubmittal
        platform="electron"
        comm={this.props.comm}
        method={this.props.appState.method}
        onSubmit={this.tellMainToRunAnalysis}
      />
    );
  }
}

module.exports.GUIJobSubmittal = GUIJobSubmittal;
