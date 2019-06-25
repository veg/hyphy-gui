import React, { Component } from "react";
import { ChooseGeneticCode } from "./choose_genetic_code.jsx";
import { ChooseSubstitutionModel } from "./choose_substitution_model.jsx";

class ChooseDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: "codon"
    };
  }

  componentDidMount() {
    // Set the data type of the parent JobSubmittal component to 3 (Codon) when ChooseDataType mounts.
    this.props.updateJobInfo("dataType", "codon");
  }

  handleDataTypeChange = event => {
    this.setState({ dataType: event.target.value });
    this.props.updateJobInfo("dataType", event.target.value);
    if (event.target.value == "amino-acid") {
      this.props.updateJobInfo("geneticCode", null);
    }
  };

  render() {
    return (
      <div>
        {this.state.dataType == "codon" ? (
          <ChooseGeneticCode updateJobInfo={this.props.updateJobInfo} />
        ) : null}
        {this.state.dataType == "amino-acid" ? (
          <ChooseSubstitutionModel updateJobInfo={this.props.updateJobInfo} />
        ) : null}

        <div className="select-element">
          <label id="analysis-content">
            Data Type<a href="/help#relax-analysis-types" target="_blank" />
          </label>
          <select
            id="data-type"
            defaultValue="codon"
            onChange={this.handleDataTypeChange}
          >
            <option value="nucleotide">Nucleotide</option>
            <option value="amino-acid">Amino acid</option>
            <option value="codon">Codon</option>
          </select>
        </div>
      </div>
    );
  }
}

module.exports.ChooseDataType = ChooseDataType;
