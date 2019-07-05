import React, { Component } from "react";
import { ChooseNumRateClasses } from "./choose_num_rate_classes.jsx";

class ChooseRateVariation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateVariation: "None"
    };
  }

  componentDidMount() {
    this.props.updateJobInfo("rateVariation", "None");
  }

  handleRateVariationChange = event => {
    this.setState({ rateVariation: event.target.value });
    this.props.updateJobInfo("rateVariation", event.target.value);
  };

  render() {
    return (
      <div>
        <div className="select-element">
          <label id="analysis-content">
            site-to-site rate variation<a
              href="/help#relax-analysis-types"
              target="_blank"
            />
          </label>
          <select
            id="data-type"
            defaultValue="None"
            onChange={this.handleRateVariationChange}
          >
            <option value="None">None</option>
            <option value="GDD">GDD</option>
            <option value="Gamma">Beta-Gamma</option>
          </select>
        </div>
        {this.state.rateVariation != "None" ? (
          <ChooseNumRateClasses updateJobInfo={this.props.updateJobInfo} />
        ) : null}
      </div>
    );
  }
}

module.exports.ChooseRateVariation = ChooseRateVariation;
