import React, { Component } from "react";

function ErrorMessage(props) {
  if (!props.message) return <div />;
  return (
    <div className="alert alert-danger" role="alert">
      <span
        className="glyphicon glyphicon-exclamation-sign"
        aria-hidden="true"
      />
      <span className="sr-only">Error:</span>
      {props.message}
    </div>
  );
}

class AdvancedBgmOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
      message: null,
      chainLength: 2000000, //length_of_each_chain:
      burnInSamples: 1000000, //number_of_burn_in_samples
      samplesFromEachChain: 100, //number_of_samples
      numberParents: 1,
      minNumberSubsPerSite: 1
    };
  }

  componentDidMount() {
    // Set the advanced fubar options of the parent JobSubmittal component to the defaults when AdvancedFubarOptions mounts.
    this.props.updateJobInfo("chainLength", this.state.chainLength);
    this.props.updateJobInfo("burnInSamples", this.state.burnInSamples);
    this.props.updateJobInfo(
      "samplesFromEachChain",
      this.state.samplesFromEachChain
    );
  }

  toggleShow = () => {
    var self = this;
    var showAdvanced = !self.state.showAdvanced;
    self.setState({
      showAdvanced: showAdvanced
    });
  };

  onLengthChange = event => {
    var value = event.target.value;
    this.setState({ chainLength: value });
    this.props.updateJobInfo("chainLength", value);
    if (value < 500000) {
      this.setState({
        message: "Please enter a chain length that is at least 500,000."
      });
    } else if (value > 50000000) {
      this.setState({
        message: "Please enter a chain length that is no more than 50,000,000."
      });
    } else {
      this.setState({ message: null });
    }
  };

  onBurninChange = event => {
    var value = event.target.value;
    var length = this.state.chainLength;
    this.setState({ burnInSamples: value });
    this.props.updateJobInfo("burnInSamples", value);
    if (value < Math.ceil(0.05 * length)) {
      this.setState({
        message:
          "Please enter a burn in that is at least 5% of the chain length."
      });
    } else if (value > Math.ceil(0.95 * length)) {
      this.setState({
        message:
          "Please enter a burn in that is no more than 95% of the chain length."
      });
    } else {
      this.setState({ message: null });
    }
  };

  onSampleChange = event => {
    var value = event.target.value;
    this.setState({ samplesFromEachChain: value });
    this.props.updateJobInfo("samplesFromEachChain", value);
    if (value < 50) {
      this.setState({
        message:
          "Please enter an amount of samples to be drawn that is more than 50."
      });
    } else if (value > this.state.chainLength - this.state.burnInSamples) {
      this.setState({
        message:
          "Please enter an amount of samples that is no more than the chain length minus the amount of burn in."
      });
    } else {
      this.setState({ message: null });
    }
  };

  onNumberParentsChange = event => {
    var value = event.target.value;
    this.setState({ numberParents: value });
    this.props.updateJobInfo("numberParents", value);
    if (value > 3) {
      this.setState({
        message: "Please enter a number of parents less than 4."
      });
    } else if (value < 1) {
      this.setState({
        message: "Please enter a positive number of parents"
      });
    } else {
      this.setState({ message: null });
    }
  };

  onMinNumberSubsPerSiteChange = event => {
    var value = event.target.value;
    this.setState({ minNumberSubsPerSite: value });
    this.props.updateJobInfo("minNumberSubsPerSite", value);
    if (value < 1) {
      this.setState({
        message:
          "Please enter a positive number for minimum number of substitutions per site"
      });
    } else {
      this.setState({ message: null });
    }
  };

  render() {
    const self = this;
    return (
      <div>
        <button
          className="btn"
          type="button"
          onClick={self.toggleShow}
          style={{ display: "block", verticalAlign: "middle" }}
        >
          Advanced options{" "}
          <span
            style={{ verticalAlign: "middle" }}
            className={
              "glyphicon glyphicon-menu-" +
              (self.state.showAdvanced ? "down" : "right")
            }
            aria-hidden="true"
          />
        </button>

        <div style={{ display: self.state.showAdvanced ? "block" : "none" }}>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label>Length of each chain</label>
                <input
                  id="length_of_each_chain"
                  className="form-control"
                  type="number"
                  step="500000"
                  value={this.state.chainLength}
                  onChange={this.onLengthChange}
                />
              </div>
              <div>
                <label>Use this many samples as burn-in</label>
                <input
                  id="number_of_burn_in_samples"
                  className="form-control"
                  type="number"
                  step="500000"
                  value={this.state.burnInSamples}
                  onChange={this.onBurninChange}
                />
              </div>
              <div>
                <label>How many samples should be drawn from each chain?</label>
                <input
                  id="number_of_samples"
                  className="form-control"
                  type="number"
                  step="10"
                  value={this.state.samplesFromEachChain}
                  onChange={this.onSampleChange}
                />
              </div>
              <div>
                <label>Maximum number of parents per node</label>
                <input
                  id="number_of_parents"
                  className="form-control"
                  type="number"
                  step="1"
                  value={this.state.numberParents}
                  onChange={this.onNumberParentsChange}
                />
              </div>
              <div>
                <label>Minimum number of substitutions per site</label>
                <input
                  id="min_number_of_subs_per_site"
                  className="form-control"
                  type="number"
                  step="1"
                  value={this.state.minNumberSubsPerSite}
                  onChange={this.onMinNumberSubsPerSiteChange}
                />
              </div>
            </div>
          </div>
        </div>
        <ErrorMessage message={this.state.message} />
      </div>
    );
  }
}

module.exports.AdvancedBgmOptions = AdvancedBgmOptions;
