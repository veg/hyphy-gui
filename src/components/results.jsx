import React, { Component } from 'react';
const path = require('path');
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
    const jsonPath = path.resolve('./data', this.props.resultsFileName);
    const jsonData = fs.readFileSync(jsonPath).toString();
    this.setState({jsonData: JSON.parse(jsonData)});
  }

  render() {
    var self = this;
    return (
      <div>
        {self.props.method === 'absrel' ? <BSREL data={self.state.jsonData}/> : null}
        {self.props.method === 'relax' ? <RELAX data={self.state.jsonData}/> : null}
      </div>
    );
  }
}

module.exports.Results = Results;
