import React, { Component } from 'react';
const fs = require('fs');
const hyphyVision = require('hyphy-vision'); 
const BSREL = hyphyVision.absrel.BSREL;
const RELAX = hyphyVision.relax.RELAX;


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: null,
    };
  }
  
  componentWillMount() {
    this.setResultsDataToState();
  }

  setResultsDataToState = () => {
    const jsonPath = this.props.appState.jobsCompleted[this.props.appState.jobInFocus].jsonPath;
    const jsonData = fs.readFileSync(jsonPath).toString();
    this.setState({jsonData: JSON.parse(jsonData)});
  }

  render() {
    const self = this;
    let method = self.props.appState.jobsCompleted[this.props.appState.jobInFocus].method;
    return (
      <div>
        {method === 'absrel' ? <BSREL data={self.state.jsonData}/> : null}
        {method === 'relax' ? <RELAX data={self.state.jsonData}/> : null}
      </div>
    );
  }
}

module.exports.Results = Results;
