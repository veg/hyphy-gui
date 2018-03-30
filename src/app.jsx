import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
const ipcRenderer = require('electron').ipcRenderer;
const _ = require('underscore');

import { HyPhyGUINavBar } from './components/navbar.jsx';
import { Home } from './components/home.jsx';
import { GUIJobSubmittal } from './components/gui_job_submittal.jsx';
import { JobProgress } from './components/job_progress.jsx';
import { JobQueue } from './components/job_queue.jsx';
import { Results } from './components/results.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      method: null,
      jobsQueued: [],
      jobRunning: {},
      jobsCompleted: {},
      jobInFocus: null
    };
  }

  componentWillMount() {
    this.setEventListeners();
    this.setState({method: null, jobInFocus: null})
  }

  setEventListeners = () => {
    const self = this;
    ipcRenderer.on('analysisComplete', (event, arg) => {
      let jobsCompletedUpdated = self.state.jobsCompleted;
      jobsCompletedUpdated[self.state.jobRunning.jobID] = self.state.jobRunning;
      self.setState({ jobsCompleted: jobsCompletedUpdated });

      if (!_.isEmpty(this.state.jobsQueued)) {
        let nextJob = self.state.jobsQueued.shift();
        self.setState({ jobRunning: nextJob });
        ipcRenderer.send('runAnalysis', {jobInfo: nextJob});
      } else {
        self.setState({ jobRunning: {} });
      }
    }); 
    ipcRenderer.on('stdout', (event, arg) => {
      if (arg.msg !== self.tempMessageForChecking) {
        let appendedStdOut = self.state.jobRunning.stdOut + arg.msg;
        let jobRunningInfo = self.state.jobRunning;
        jobRunningInfo.stdOut = appendedStdOut;
        self.setState({jobRunning: jobRunningInfo})
        self.tempMessageForChecking = arg.msg;
      }
    }); 
  }

  changeAppState = (stateToSet, valueToSet) => {
    /**
     * changeAppState is a function used to set the state of the App component from within other components.
     * 
     * changeAppState is pased down as a prop to components and should be called with an arrow 
     * function if in the render method to allow the passing of arguments.
     * For example: `onClick={() => self.props.changeAppState('exampleKeyForAppState', 'exampleValue')}
     */
    this.setState({ [stateToSet]: valueToSet });
  }

  render() {
    var self = this;
    return (
      <div style={{paddingTop: '70px'}}>
        <HyPhyGUINavBar appState={ self.state } changeAppState={ self.changeAppState } />
        {this.state.page === 'home' ? <Home /> : null}
        {this.state.page === 'jobSubmittal' ? <GUIJobSubmittal appState={ self.state } changeAppState={ self.changeAppState } /> : null}
        {this.state.page === 'jobProgress' ? <JobProgress appState={ self.state } changeAppState={ self.changeAppState } /> : null}
        {this.state.page === 'jobQueue' ? <JobQueue appState={ self.state } changeAppState={ self.changeAppState } /> : null}
        {this.state.page === 'results' ? <Results appState={ self.state } changeAppState= { self.changeAppState } />: null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
