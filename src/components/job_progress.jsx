import React, { Component } from 'react';
const ipcRenderer = require('electron').ipcRenderer;
const ReactMarkdown = require('react-markdown');

function Table(props) {
  // A simple table component used to render the job status output.
  return <table className="table table-striped">{props.children}</table>;
}

class JobProgress extends Component {

  render() {
    return (
      <div>
        <h2>Job Progress Page</h2>
        <ReactMarkdown source={this.props.appState.jobRunning.stdOut} renders={{table: Table}} />
      </div>
    );
  }
}

module.exports.JobProgress = JobProgress;
