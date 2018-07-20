import React, { Component } from "react";
const ReactMarkdown = require("react-markdown");
const _ = require("underscore");

import { JobsTable } from "./jobs_table.jsx";
import methodSpecificInfo from "./../helpers/method_specific_info";

function Table(props) {
  // A simple table component used to render the job status output.
  return <table className="table table-striped">{props.children}</table>;
}

class JobProgress extends Component {
  getRunningJob = () => {
    let jobRunning = this.props.appState.jobRunning;
    if (_.isEmpty(jobRunning)) {
      return null;
    } else {
      return (
        <tbody>
          <tr>
            <td>{jobRunning.msaName}</td>
            <td>{jobRunning.method}</td>
            <td>{jobRunning.timeSubmitted}</td>
          </tr>
        </tbody>
      );
    }
  };

  render() {
    const self = this;
    const jobRunning = this.props.appState.jobRunning;
    if (!jobRunning || _.isEmpty(jobRunning)) {
      return <div />;
    }
    return (
      <div>
        <h1>
          {methodSpecificInfo[self.props.appState.jobRunning.method].name}
        </h1>
        <p>
          {
            methodSpecificInfo[self.props.appState.jobRunning.method]
              .description
          }
        </p>

        <JobsTable title="" rows={this.getRunningJob()} />
        <button
          className="btn btn-danger ml-auto"
          onClick={() => self.props.cancelJob()}
        >
          Cancel Job
        </button>

        <p>Standard Output</p>
        <div
          style={{
            borderStyle: "solid",
            paddingLeft: "20px",
            paddingRight: "20px",
            height: "500px",
            overflow: "scroll"
          }}
        >
          <ReactMarkdown
            source={this.props.appState.jobRunning.stdOut}
            renders={{ table: Table }}
          />
        </div>
      </div>
    );
  }
}

module.exports.JobProgress = JobProgress;
