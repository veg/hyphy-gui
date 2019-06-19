import React, { Component } from "react";

class ChooseSynRateVariation extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Set the synRateVariation of the parent JobSubmittal component to Yes when ChooseAnalysisType mounts.
    this.props.updateJobInfo("synRateVariation", "Yes");
  }

  handleChange = event => {
    this.props.updateJobInfo("synRateVariation", event.target.value);
  };

  render() {
    return (
      <div className="select-element">
        <label>
          Synonymous rate variation (recommended)<a
            href="/help#relax-analysis-types"
            target="_blank"
          />
        </label>
        <select defaultValue="Yes" onChange={this.handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseSynRateVariation = ChooseSynRateVariation;
