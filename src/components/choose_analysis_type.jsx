import React, { Component } from 'react';


/** TODO: 
 * 1. Restyle... currently using what was on datamonkey.org.
 * 2. Get the file set to state
 */
class ChooseAnalysisType extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
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
        <select id="analysis-type" onChange={this.handleChange} >
          <option selected="" value="1">
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
