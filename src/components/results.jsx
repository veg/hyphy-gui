import React, { Component } from "react";
const fs = require("fs");
const hyphyVision = require("hyphy-vision");
const BSREL = hyphyVision.absrel.BSREL;
const BUSTED = hyphyVision.busted.BUSTED;
const FEL = hyphyVision.fel.FEL;
const FUBAR = hyphyVision.fubar.FUBAR;
const GARD = hyphyVision.gard.GARD;
const MEME = hyphyVision.meme.MEME;
const RELAX = hyphyVision.relax.RELAX;
const SLAC = hyphyVision.slac.SLAC;

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: null,
      fasta: false
    };
  }

  componentDidMount() {
    this.setResultsDataToState();
  }

  setResultsDataToState = () => {
    const jsonPath = this.props.jobInfo.jsonPath;
    const jsonData = fs.readFileSync(jsonPath).toString();
    this.setState({ jsonData: JSON.parse(jsonData) });
    this.setFastaToState();
  };

  setFastaToState = () => {
    const fastaPath = this.props.jobInfo.fastaPath;
    const fastaString = fs.readFileSync(fastaPath).toString();
    this.setState({ fasta: fastaString });
  };

  render() {
    const self = this;
    let method = self.props.jobInfo.method;
    return (
      <div>
        {method === "absrel"
          ? [
              <div>
                <BSREL data={self.state.jsonData} fasta={self.state.fasta} />
              </div>
            ]
          : null}
        {method === "busted" ? (
          <BUSTED data={self.state.jsonData} fasta={self.state.fasta} />
        ) : null}
        {method === "fel" ? (
          <FEL data={self.state.jsonData} fasta={self.state.fasta} />
        ) : null}
        {method === "fubar" ? (
          <FUBAR data={self.state.jsonData} fasta={self.state.fasta} />
        ) : null}
        {method === "meme" ? (
          <MEME data={self.state.jsonData} fasta={self.state.fasta} />
        ) : null}
        {method === "relax" ? (
          <RELAX data={self.state.jsonData} fasta={self.state.fasta} />
        ) : null}
        {method === "slac" ? (
          <SLAC data={self.state.jsonData} fasta={self.state.fasta} />
        ) : null}
      </div>
    );
  }
}

module.exports.Results = Results;
