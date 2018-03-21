import React, { Component } from 'react';
const ipcRenderer = require('electron').ipcRenderer;
const ReactMarkdown = require('react-markdown');

function Table(props) {
  // A simple table component used to render the job status output.
  return <table className="table table-striped">{props.children}</table>;
}

class JobProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentWillMount() {
    this.setEventListeners();
  }

  setEventListeners = () => {
    const self = this;
    ipcRenderer.on('stdout', (event, arg) => {
      if (arg.msg !== self.tempMessageForChecking) {
        self.setState({message: self.state.message + arg.msg})
        self.tempMessageForChecking = arg.msg;
      }
    }); 
  }

  render() {
    return (
      <div>
        <h2>Job Progress Page</h2>
        <p>Placeholcer for the job progress page</p>
        <ReactMarkdown source={this.state.message} renders={{table: Table}} />
      </div>
    );
  }
}

module.exports.JobProgress = JobProgress;
