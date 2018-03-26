import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
const ipcRenderer = require('electron').ipcRenderer;

import { HyPhyGUINavBar } from './components/navbar.jsx';
import { Home } from './components/home.jsx';
import { GUIJobSubmittal } from './components/gui_job_submittal.jsx';
import { JobProgress } from './components/job_progress.jsx';
import { Results } from './components/results.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      method: null,
      jobRunning: false,
      resultsFileName: null
    };
  }

  componentWillMount() {
    this.setEventListeners();
  }

  setEventListeners = () => {
    const self = this;
    ipcRenderer.on('analysisComplete', (event, arg) => {
      self.setState({
        method: arg.msg.method,
        resultsFileName: (arg.msg.msaPath + '.' + arg.msg.method.toUpperCase() + '.json'),
        page: 'results',
        jobRunning: false
      })
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
      <div>
        <HyPhyGUINavBar changeAppState={ self.changeAppState } />
        {this.state.page === 'home' ? <Home /> : null}
        {this.state.page === 'jobSubmittal' ? <GUIJobSubmittal appState={ self.state } changeAppState={ self.changeAppState } /> : null}
        {this.state.page === 'jobProgress' ? <JobProgress changeAppState={ self.changeAppState } /> : null}
        {this.state.page === 'results' ? <Results method={ self.state.method } resultsFileName={ self.state.resultsFileName }/>: null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
