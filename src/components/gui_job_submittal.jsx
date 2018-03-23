import React, { Component } from 'react';
const ipcRenderer = require('electron').ipcRenderer;
import { JobSubmittal } from './job_submittal.jsx' // This will be replaced by an import from hyphy-vision when ready.


/**
 * GUIJobSubmittal is a component that wraps the generic JobSubmittal component (to be impored from vision)
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
     * tellMainToRunAnalysis also changes the state of App to {page: jobProgress} and {jobRunning: true}.
     */
    if (this.props.appState.jobRunning === false) {
      ipcRenderer.send('runAnalysis', {method: this.props.appState.method, jobInfo: jobInfo});
      this.props.changeAppState('page', 'jobProgress');
      this.props.changeAppState('jobRunning', true);
    } else {
      alert('Another job is already running... the GUI does not support queueing yet');
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
