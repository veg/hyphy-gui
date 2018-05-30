import React, { Component } from 'react';


class ChooseAnalysisType extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Set the analysis type of the parent JobSubmittal component to 1 (all) when ChooseAnalysisType mounts.
    this.props.updateJobInfo('analysisType', '1')
  }

  handleChange = (event) => {
    this.props.updateJobInfo('analysisType', event.target.value)
  }

  render() {
    return (
      <div className="select-element">
        <label id="analysis-content">Analysis Type<a href="/help#relax-analysis-types" target="_blank"><sup>?</sup></a></label>
        <select id="analysis-type" defaultValue="1" onChange={this.handleChange} >
          <option value="1">
            All
          </option>
          <option value="2">
            Minimal
          </option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseAnalysisType = ChooseAnalysisType;
