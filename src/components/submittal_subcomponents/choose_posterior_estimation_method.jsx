import React, { Component } from "react";

class ChoosePosteriorEstimationMethod extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Set the substitution model of the parent JobSubmittal component to 1 (LG) when ChooseSubStitutionModel mounts.
    this.props.updateJobInfo("posteriorEstimationMethod", "1");
  }

  handleChange = event => {
    this.props.updateJobInfo("posteriorEstimationMethod", event.target.value);
  };

  render() {
    return (
      <div className="upload-div">
        <label id="posterior-estimation-method-content">
          Posterior Estimation Method
        </label>
        <select
          name="posterior-estimation-method"
          defaultValue="1"
          onChange={this.handleChange}
        >
          <option value="1">
            Metropolis-Hastings - Full Metropolis-Hastings MCMC algorithm
            (slowest, original 2013 paper implementation)
          </option>
          <option value="2">
            Collapsed Gibbs - Collapsed Gibbs sampler (intermediate speed)
          </option>
          <option value="3">
            Variational Bayes - 0-th order Variational Bayes approximations
            (fastest, recommended default)
          </option>
        </select>
      </div>
    );
  }
}

module.exports.ChoosePosteriorEstimationMethod = ChoosePosteriorEstimationMethod;
