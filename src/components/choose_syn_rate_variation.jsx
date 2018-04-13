import React, { Component } from 'react';


class ChooseSynRateVariation extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Set the synRateVariation of the parent JobSubmittal component to 1 (yes) when ChooseAnalysisType mounts.
    this.props.updateJobInfo('synRateVariation', '1')
  }

  handleChange = (event) => {
    this.props.updateJobInfo('synRateVariation', event.target.value)
  }

  render() {
    return (
      <div className="select-element">
        <label >Synonymous rate variation (recommended)<a href="/help#relax-analysis-types" target="_blank"><sup>?</sup></a></label>
        <select defaultValue="1" onChange={this.handleChange} >
          <option value="1">
            Yes
          </option>
          <option value="2">
            No
          </option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseSynRateVariation = ChooseSynRateVariation;
