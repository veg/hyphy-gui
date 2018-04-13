import React, { Component } from 'react';


class ChooseSiteRateVariation extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Set the siteRateVariation of the parent JobSubmittal component to 1 (None) when ChooseAnalysisType mounts.
    this.props.updateJobInfo('siteRateVariation', '1')
  }

  handleChange = (event) => {
    this.props.updateJobInfo('siteRateVariation', event.target.value)
  }

  render() {
    return (
      <div className="select-element">
        <label >Site-to-site rate variation<a href="/help#relax-analysis-types" target="_blank"><sup>?</sup></a></label>
        <select defaultValue="1" onChange={this.handleChange} >
          <option value="1">
            None
          </option>
          <option value="2">
            General Discrete
            </option>
            <option value="3">
            Beta-Gamma
          </option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseSiteRateVariation = ChooseSiteRateVariation;
