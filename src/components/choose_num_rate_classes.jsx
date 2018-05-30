import React, { Component } from 'react';


class ChooseNumRateClasses extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Set the numRateClasses of the parent JobSubmittal component to 2 (the default) when ChooseAnalysisType mounts.
    this.props.updateJobInfo('numRateClasses', 2)
  }

  handleChange = (event) => {
    this.props.updateJobInfo('numRateClasses', event.target.value)
  }

  render() {
    return (
      <div className="select-element">
        <div>
          <div>
            <label id="datatype-content">Rate classes</label> 
            <input onChange={this.handleChange} name="rate_classes" className="form-control" type="number" defaultValue="2" step="1" min="2" max="6" />
          </div>
        </div>
      </div>
    );
  }
}

module.exports.ChooseNumRateClasses = ChooseNumRateClasses;
