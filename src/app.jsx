import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
const ipcRenderer = require('electron').ipcRenderer;

import { HyPhyGUINavBar } from './components/navbar.jsx';
import { Home } from './components/home.jsx';
import { JobSubmittal } from './components/job_submittal.jsx';
import { JobProgress } from './components/job_progress.jsx';
import { Results } from './components/results.jsx';
const hyphyVision = require('hyphy-vision'); // TODO: I don't think I'm using hyphyVision but when I remove this line the navbar drop down menues don't appear anymore...


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      method: null,
      resultsFileName: 'CD2.fna.ABSREL.json', // TODO: set to null originally and change dynamically
    };
  }

  componentWillMount() {
    this.setEventListeners();
  }

  setEventListeners = () => {
    const self = this;
    ipcRenderer.on('analysisComplete', (event, arg) => {
      self.setState({
        page: 'results',
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
     *
     * The React docs discourage setting state without using the "setState" method... 
     * I'm using "this.state[stateToSet]" below because I haven't been able to  pass a variable as a key to
     * "setState". "this.setState({})" simply calls the setState method without actually changing the state... 
     * I'm not exaclty sure why but this seems to be necessary 
     * (the function doesn't do anything when that line is removed).
     */
    this.setState({});
    this.state[stateToSet] = valueToSet;
  }

  render() {
    var self = this;
    return (
      <div>
        <HyPhyGUINavBar changeAppState={ self.changeAppState } />
        {this.state.page === 'home' ? <Home /> : null}
        {this.state.page === 'jobSubmittal' ? <JobSubmittal method={ self.state.method } changeAppState={ self.changeAppState } /> : null}
        {this.state.page === 'jobProgress' ? <JobProgress changeAppState={ self.changeAppState } /> : null}
        {this.state.page === 'results' ? <Results method={ self.state.method } resultsFileName={ self.state.resultsFileName}/>: null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
