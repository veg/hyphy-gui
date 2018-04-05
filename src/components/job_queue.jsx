import React, { Component } from 'react';
const ipcRenderer = require('electron').ipcRenderer;
const _ = require('underscore');
import { JobsTable } from './jobs_table.jsx';


class JobQueue extends Component {
  constructor(props) {
    super(props);
  }

  getQueuedJobs = () => {
    let jobsQueued = this.props.appState.jobsQueued;

    let rows = [];
    for (var i=0; i<jobsQueued.length; i++) {
      let job = jobsQueued[i];
      rows.unshift(
        <tr>  
          <td>{job.msaName}</td>
          <td>{job.method}</td>
          <td>{job.timeSubmitted}</td>
        </tr>
        )
    }
    if (jobsQueued.length == 0) {
      return(null) 
    } else {
      return(
        <tbody>
          {rows}
        </tbody>
      )
    }
  }

  getRunningJob = () => {
    let jobRunning = this.props.appState.jobRunning;
    if (_.isEmpty(jobRunning)) {
      return(null) 
    } else {
      return(
        <tbody>
          <tr onClick={() => this.clickRunningJob(jobRunning.jobID)}>
            <td>{jobRunning.msaName}</td>
            <td>{jobRunning.method}</td>
            <td>{jobRunning.timeSubmitted}</td>
          </tr>
        </tbody>
      )
    }
  }
  
  clickRunningJob = (jobID) => {
    this.props.changeAppState('jobInFocus', jobID);
    this.props.changeAppState('page', 'jobProgress');
  }

  getCompletedJobs = () => {
    let jobsCompleted = this.props.appState.jobsCompleted;
    let rows = [];
    for (var key in jobsCompleted) {
      let job = jobsCompleted[key];
      // TODO: The onClick event below only passes the key (jobID) for the last row of the table...
      rows.push(
        <tr onClick={() => this.clickCompletedJob(key)}>
          <td>{job.msaName}</td>
          <td>{job.method}</td>
          <td>{job.timeSubmitted}</td>
        </tr>
        )
    }
    if (_.isEmpty(jobsCompleted)) {
      return(null) 
    } else {
      return(
        <tbody>
          {rows}
        </tbody>
      )
    }
  }

  clickCompletedJob = (jobID) => {
    this.props.changeAppState('jobInFocus', jobID);
    this.props.changeAppState('page', 'results');
  }

  render() {
    return (
      <div>
        <JobsTable title="Queued" rows = {this.getQueuedJobs()} />
        <JobsTable title="Running" rows = {this.getRunningJob()} />
        <JobsTable title="Completed" rows = {this.getCompletedJobs()} />
      </div>
    );
  }
}

module.exports.JobQueue = JobQueue;
