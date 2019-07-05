import React, { Component } from "react";

class ChooseAnalysisType extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Set the analysis type of the parent JobSubmittal component to 1 (all) when ChooseAnalysisType mounts.
    this.props.updateJobInfo("analysisType", "All");
  }

  handleChange = event => {
    this.props.updateJobInfo("analysisType", event.target.value);
  };

  render() {
    return (
      <div className="select-element">
        <label id="analysis-content">
          Analysis Type<a href="/help#relax-analysis-types" target="_blank" />
        </label>
        <select
          id="analysis-type"
          defaultValue="All"
          onChange={this.handleChange}
        >
          <option value="All">All</option>
          <option value="Minimal">Minimal</option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseAnalysisType = ChooseAnalysisType;
