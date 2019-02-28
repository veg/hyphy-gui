import React, { Component } from "react";

class ChooseDataType extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Set the data type of the parent JobSubmittal component to 3 (Codon) when ChooseDataType mounts.
    this.props.updateJobInfo("dataType", "3");
  }

  handleChange = event => {
    this.props.updateJobInfo("dataType", event.target.value);
  };

  render() {
    return (
      <div className="select-element">
        <label id="analysis-content">
          Data Type<a href="/help#relax-analysis-types" target="_blank">
            <sup>?</sup>
          </a>
        </label>
        <select id="data-type" defaultValue="3" onChange={this.handleChange}>
          <option value="1">Nucleotide</option>
          <option value="2">Amino acid</option>
          <option value="3">Codon</option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseDataType = ChooseDataType;
