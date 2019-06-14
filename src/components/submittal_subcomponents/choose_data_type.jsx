import React, { Component } from "react";
import { ChooseGeneticCode } from "./choose_genetic_code.jsx";
import { ChooseSubstitutionModel } from "./choose_substitution_model.jsx";

class ChooseDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: "3"
    };
  }

  componentDidMount() {
    // Set the data type of the parent JobSubmittal component to 3 (Codon) when ChooseDataType mounts.
    this.props.updateJobInfo("dataType", "3");
  }

  handleDataTypeChange = event => {
    this.setState({ dataType: event.target.value });
    this.props.updateJobInfo("dataType", event.target.value);
  };

  render() {
    return (
      <div>
        {this.state.dataType == "3" ? (
          <ChooseGeneticCode updateJobInfo={this.props.updateJobInfo} />
        ) : null}
        {this.state.dataType == "2" ? (
          <ChooseSubstitutionModel updateJobInfo={this.props.updateJobInfo} />
        ) : null}

        <div className="select-element">
          <label id="analysis-content">
            Data Type<a href="/help#relax-analysis-types" target="_blank" />
          </label>
          <select
            id="data-type"
            defaultValue="3"
            onChange={this.handleDataTypeChange}
          >
            <option value="1">Nucleotide</option>
            <option value="2">Amino acid</option>
            <option value="3">Codon</option>
          </select>
        </div>
      </div>
    );
  }
}

module.exports.ChooseDataType = ChooseDataType;
