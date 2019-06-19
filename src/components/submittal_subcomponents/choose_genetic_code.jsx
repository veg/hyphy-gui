import React, { Component } from "react";

class ChooseGeneticCode extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    this.props.updateJobInfo("geneticCode", event.target.value);
  };

  render() {
    return (
      <div className="upload-div">
        <label id="geneticcode-content">
          Genetic Code<a href="/help#genetic-code" target="_blank" />
        </label>
        <select
          name="gencodeid"
          defaultValue="Universal"
          onChange={this.handleChange}
        >
          <option value="Universal">Universal code</option>
          <option value="Vertebrate-mtDNA">
            Vertebrate mitochondrial DNA code
          </option>
          <option value="Yeast-mtDNA">Yeast mitochondrial DNA code</option>
          <option value="Mold-Protozoan-mtDNA">
            Mold, Protozoan and Coelenterate mt; Mycloplasma/Spiroplasma
          </option>
          <option value="Invertebrate-mtDNA">
            Invertebrate mitochondrial DNA code
          </option>
          <option value="Ciliate-Nuclear">
            Ciliate, Dasycladacean and Hexamita Nuclear code
          </option>
          <option value="Echinoderm-mtDNA">
            Echinoderm mitochondrial DNA code
          </option>
          <option value="Euplotid-Nuclear">Euplotid Nuclear code</option>
          <option value="Alt-Yeast-Nuclear">
            Alternative Yeast Nuclear code
          </option>
          <option value="Ascidian-mtDNA">
            Ascidian mitochondrial DNA code
          </option>
          <option value="Flatworm-mtDNA">
            Flatworm mitochondrial DNA code
          </option>
          <option value="Blepharisma-Nuclear">Blepharisma Nuclear code</option>
        </select>
      </div>
    );
  }
}

module.exports.ChooseGeneticCode = ChooseGeneticCode;
