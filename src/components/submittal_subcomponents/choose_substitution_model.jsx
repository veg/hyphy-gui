import React, { Component } from "react";

class ChooseSubstitutionModel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Set the substitution model of the parent JobSubmittal component to 1 (LG) when ChooseSubStitutionModel mounts.
    this.props.updateJobInfo("substitutionModel", "1");
  }

  handleChange = event => {
    this.props.updateJobInfo("substitutionModel", event.target.value);
  };

  render() {
    return (
      <div className="upload-div">
        <label id="substitution-model-content">
          Amino Acid Substitution Model
        </label>
        <select
          name="substitution-model"
          defaultValue="LG"
          onChange={this.handleChange}
        >
          <option value="LG">
            LG (Generalist empirical model from Le and Gascuel 2008)
          </option>
          <option value="WAG">
            WAG (Generalist empirical model from Whelon and Goldman 2001)
          </option>
          <option value="JTT">
            JTT (Generalist empirical model from Jones, Taylor and Thornton
            1996)
          </option>
          <option value="JC69">
            JC69 (Generalist empirical model with equal exhangeability rates
            among all amino acids)
          </option>
          <option value="mtMet">
            mtMet (Specialist empirical model for metazoan mitochondrial genomes
            from Le, Dang and Le 2007)
          </option>
          <option value="mtVer">
            mtVer (Specialist empirical model for vertebrate mitochondrial
            gemones from Le, Dang and Le 2007)
          </option>
          <option value="mtInv">
            mtInv (Specialist empirical model for invertebrate mitochondrial
            genomes from Le, Dang and Le 2007)
          </option>
          <option value="gcpREV">
            gcpREV (Specialist empirical model for green plant chloroplast
            genomes from Cox and Foster 20013)
          </option>
          <option value="HIVBm">
            HIVBm (Specialist empirical model for between-host HIV sequences
            from Nickle et al. 2007)
          </option>
          <option value="HIVWm">
            HIVWm (Specialist empirical model for within-host HIV sequences from
            Nickle et al. 2007)
          </option>
          <option value="GTR">
            GTR (General time reversible model; 189 estimated parameters)
          </option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseSubstitutionModel = ChooseSubstitutionModel;
