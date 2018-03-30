import React, { Component } from 'react';
const ipcRenderer = require('electron').ipcRenderer;
import { JobSubmittal } from './job_submittal.jsx' // This will be replaced by an import from hyphy-vision when ready.
const _ = require('underscore');


/**
 * GUIJobSubmittal wraps the generic JobSubmittal component (to be impored from vision)
 * and provide the funcitionality unique to the GUI.
 */
class GUIJobSubmittal extends Component {
  constructor(props) {
    super(props);
  }

  tellMainToRunAnalysis = (jobInfo) => {
    /**
     * A function to send a message to the main process telling it to run a hyphy job.
     * ipcRenderer sends "runAnalysis" to main.
     * A listener ("ipcMain.on") is listening for "runAnalysis" on the Main side.
     */

    // Add timeSubmitted to jobInfo.
    let currentDate = new Date();
    let timeSubmitted = (currentDate.getMonth() + 1) +
      "/"+ currentDate.getDate() + 
      "/" + currentDate.getFullYear() + "_" + 
      currentDate.getHours() + ":" + 
      currentDate.getMinutes() + ":" +
      currentDate.getSeconds();
    jobInfo['timeSubmitted'] = timeSubmitted;

    // Add jobID to jobInfo.
    let jobID = jobInfo.msaName + "_" + jobInfo.method + "_" + timeSubmitted;
    jobInfo['jobID'] = jobID; 

    // Add jsonPath to jobInfo.
    jobInfo['jsonPath'] = jobInfo.msaPath + '.' + jobInfo.method.toUpperCase() + '.json';

    // Send the message to run the job or add to the queued job list.
    if (_.isEmpty(this.props.appState.jobRunning)) {
      ipcRenderer.send('runAnalysis', {jobInfo: jobInfo});
      this.props.changeAppState('page', 'jobProgress');
      this.props.changeAppState('jobRunning', jobInfo);
      this.props.changeAppState('jobInFocus', jobInfo.jobID);
    } else {
      let QueuedJobsUpdated = this.props.appState.jobsQueued;
      QueuedJobsUpdated.push(jobInfo);
      this.props.changeAppState('page', 'jobQueue');
      this.props.changeAppState('jobsQueued', QueuedJobsUpdated);
      this.props.changeAppState('method', null);
    }
  }

  render() {
    var self = this;
    return (
      <JobSubmittal platform='electron' method={self.props.appState.method} onSubmit={self.tellMainToRunAnalysis} />
    );
  }
}

module.exports.GUIJobSubmittal = GUIJobSubmittal;
