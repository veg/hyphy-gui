import React, { Component } from "react";
const _ = require("underscore");
import { JobsTable } from "./jobs_table.jsx";

class TableRow extends Component {
  /**
   *  This component is needed to be able to pass different onClick functions (with a parameter) to each row.
   */
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.onClick(this.props.jobID);
  };

  render() {
    return (
      <tr onClick={this.handleClick}>
        <td>{this.props.cells[0]}</td>
        <td>{this.props.cells[1]}</td>
        <td>{this.props.cells[2]}</td>
      </tr>
    );
  }
}

class JobQueue extends Component {
  constructor(props) {
    super(props);
  }

  getQueuedJobs = () => {
    let jobsQueued = this.props.appState.jobsQueued;

    let rows = [];
    for (var i = 0; i < jobsQueued.length; i++) {
      let job = jobsQueued[i];
      rows.unshift(
        <tr>
          <td>{job.msaName}</td>
          <td>{job.method}</td>
          <td>{job.timeSubmitted}</td>
        </tr>
      );
    }
    if (jobsQueued.length == 0) {
      return null;
    } else {
      return <tbody>{rows}</tbody>;
    }
  };

  getRunningJob = () => {
    let jobRunning = this.props.appState.jobRunning;
    if (_.isEmpty(jobRunning)) {
      return null;
    } else {
      return (
        <tbody>
          <tr onClick={() => this.clickRunningJob(jobRunning.jobID)}>
            <td>{jobRunning.msaName}</td>
            <td>{jobRunning.method}</td>
            <td>{jobRunning.timeSubmitted}</td>
          </tr>
        </tbody>
      );
    }
  };

  clickRunningJob = jobID => {
    this.props.changeAppState("jobInFocus", jobID);
    this.props.changeAppState("page", "jobProgress");
  };

  getCompletedJobs = () => {
    let jobsCompleted = this.props.appState.jobsCompleted;
    let rows = [];
    for (var key in jobsCompleted) {
      let job = jobsCompleted[key];
      rows.unshift(
        <TableRow
          onClick={this.clickCompletedJob}
          jobID={key}
          cells={[job.msaName, job.method, job.timeSubmitted]}
        />
      );
    }
    if (_.isEmpty(jobsCompleted)) {
      return null;
    } else {
      return <tbody>{rows}</tbody>;
    }
  };

  clickCompletedJob = jobID => {
    this.props.changeAppState("jobInFocus", jobID);
    this.props.changeAppState("page", "results");
  };

  getErroredJobs = () => {
    let jobsErrored = this.props.appState.jobsErrored;
    let rows = [];
    for (var key in jobsErrored) {
      let job = jobsErrored[key];
      rows.unshift(
        <TableRow
          onClick={this.clickErroredJob}
          jobID={key}
          cells={[job.msaName, job.method, job.timeSubmitted]}
        />
      );
    }
    if (_.isEmpty(jobsErrored)) {
      return null;
    } else {
      return <tbody>{rows}</tbody>;
    }
  };

  clickErroredJob = jobID => {
    //TODO: Create an errored/canceled jobs page or modal.
    let stdOut = this.props.appState.jobsErrored[jobID].stdOut;
    let tailOfStdOut =
      "THE LAST 1,000 CHARACTERS of STDOUT: \n\n" +
      stdOut.substr(stdOut.length - 1000);
    alert(tailOfStdOut);
  };

  render() {
    return (
      <div style={{ paddingRight: "30px", paddingLeft: "30px" }}>
        <JobsTable title="Queued" rows={this.getQueuedJobs()} />
        <JobsTable title="Running" rows={this.getRunningJob()} />
        <JobsTable title="Completed" rows={this.getCompletedJobs()} />
        <JobsTable title="Canceled or Errored" rows={this.getErroredJobs()} />
      </div>
    );
  }
}

module.exports.JobQueue = JobQueue;
