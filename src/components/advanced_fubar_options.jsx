import React, { Component } from 'react';


function ErrorMessage(props){
  if(!props.message) return <div></div>;
  return (<div className="alert alert-danger" role="alert">
    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span className="sr-only">Error:</span>
    {props.message}
  </div>);
}

class AdvancedFubarOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
      message: null,
      gridPoints: 20,
      MCMCChains: 5,
      chainLength: 2000000,//length_of_each_chain:
      burnInSamples: 1000000,//number_of_burn_in_samples
      samplesFromEachChain: 100,//number_of_samples
      concDirichletPrior: 0.5
    };
  }

  componentDidMount() {
    // Set the advanced fubar options of the parent JobSubmittal component to the defaults when AdvancedFubarOptions mounts.
    this.props.updateJobInfo('gridPoints', this.state.gridPoints);
    this.props.updateJobInfo('MCMCChains', this.state.MCMCChains);
    this.props.updateJobInfo('chainLength', this.state.chainLength);
    this.props.updateJobInfo('burnInSamples', this.state.burnInSamples);
    this.props.updateJobInfo('samplesFromEachChain', this.state.samplesFromEachChain);
    this.props.updateJobInfo('concDirichletPrior', this.state.concDirichletPrior);
  }

  toggleShow = () => {
    var self = this;
    var showAdvanced = !self.state.showAdvanced;
    self.setState({
      showAdvanced: showAdvanced
    });
  }

  onGridPointsChange = (event) => {
    var value = event.target.value;
    this.setState({'gridPoints': value});
    this.props.updateJobInfo('gridPoints', value);
    if(value <= 0){
      this.setState({message: "Please enter a positive number for the number of grid points"});
    } else {
      this.setState({message: null});
    }
  }

  onMCMCChainsChange = (event) => {
    var value = event.target.value;
    this.setState({'MCMCChains': value});
    this.props.updateJobInfo('MCMCChains', value);
    if(value <= 0){
      this.setState({message: "Please enter a positive number for the number of MCMC chains"});
    } else {
      this.setState({message: null});
    }
  }

  onLengthChange = (event) => {
    var value = event.target.value;
    this.setState({'chainLength': value});
    this.props.updateJobInfo('chainLength', value);
    if(value < 500000){
      this.setState({message: "Please enter a chain length that is at least 500,000."});
    } else if (value > 50000000) {
      this.setState({message: "Please enter a chain length that is no more than 50,000,000."});
    } else {
      this.setState({message: null});
    }
  }

  onBurninChange = (event) => {
    var value = event.target.value;
    var length = this.state.chainLength;
    this.setState({'burnInSamples': value});
    this.props.updateJobInfo('burnInSamples', value);
    if(value < Math.ceil(.05*length)){
      this.setState({message: "Please enter a burn in that is at least 5% of the chain length."});
    } else if (value > Math.ceil(.95*length)) {
      this.setState({message: "Please enter a burn in that is no more than 95% of the chain length."});
    } else {
      this.setState({message: null});
    }
  }

  onSampleChange = (event) => {
    var value = event.target.value;
    this.setState({'samplesFromEachChain': value});
    this.props.updateJobInfo('samplesFromEachChain', value);
    if(value < 50){
      this.setState({message: "Please enter an amount of samples to be drawn that is more than 50."});
    } else if (value > this.state.chainLength - this.state.burnInSamples) {
      this.setState({message: "Please enter an amount of samples that is no more than the chain length minus the amount of burn in."});
    } else {
      this.setState({message: null});
    }
  }

  onConcDirichletPriorChange = (event) => {
    var value = event.target.value;
    this.setState({'concDirichletPrior': value});
    this.props.updateJobInfo('concDirichletPrior', value);
    if(value <= 0){
      this.setState({message: "Please enter a positive number for the concentration parameter of the Dirichlet prior."});
    } else {
      this.setState({message: null});
    }
  }


  render() {
    const self = this;
    return (
      <div>
        <button
          className="btn"
          type="button"
          onClick={self.toggleShow}
          style={{display: "block", verticalAlign: "middle"}}
        >
          Advanced options
          {" "}<span
            style={{verticalAlign: "middle"}}
            className={"glyphicon glyphicon-menu-"+(self.state.showAdvanced ? "down" : "right")}
            aria-hidden="true"
          />
        </button>

        <div style={{display: self.state.showAdvanced ? "block" : "none"}}>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label>Number of grid points</label>
                <input id="number_of_grid_points" className="form-control" type="number" onChange={this.onGridPointsChange} defaultValue="20" step="1" min="5" max="50" />
              </div>

              <div>
                <label>Number of MCMC chains</label>
                <input id="number_of_mcmc_chains" className="form-control" type="number" onChange={this.onMCMCChainsChange} defaultValue="5" step="1" min="2" max="20" />
              </div>

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
            </div>
            <div className="col-md-6">
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
                <label>Concentration parameter of the Dirichlet prior</label>
                <input id="concentration_of_dirichlet_prior" className="form-control" onChange={this.onConcDirichletPriorChange} etype="number" defaultValue=".5" step="1" min="0.001" max="1" />
              </div>
            </div>
          </div>
        </div>
        <ErrorMessage message={this.state.message} />
      </div>
    );
  }
}

module.exports.AdvancedFubarOptions = AdvancedFubarOptions;
