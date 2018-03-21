import React, { Component } from 'react';
const ipcRenderer = require('electron').ipcRenderer;

class JobSubmittal extends Component {
  constructor(props) {
    super(props);
  }

  tellMainToRunAnalysis = () => {
    /**
     * A function to send a message to the main process telling it to run a hyphy job.
     * ipcRenderer sends "runAnalysis" to main.
     * A listener ("ipcMain.on") is listening for "runAnalysis" on the Main side.
     * tellMainToRunAnalysis also changes the state of App to {page: jobProgress}.
     */
    ipcRenderer.send('runAnalysis', {method: this.props.method, otherInfo: 'to be added later'});
    this.props.changeAppState('page', 'jobProgress');
  }

  render() {
    var self = this;
    return (
      <div>
        <h2>Job Submittal Page</h2>
        <p>Placeholder for the job submittal page</p>
        <button onClick={self.tellMainToRunAnalysis}>Run analysis (aBSREL) on Test Data</button>
      </div>
    );
  }
}

module.exports.JobSubmittal = JobSubmittal;
