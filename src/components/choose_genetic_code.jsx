import React, {Component } from 'react';


/** TODO: 
 * 1. Restyle... currently using what was on datamonkey.org.
 * 2. I changed these to be numbered from 1 instead of 0 because hyphy expects universal code to be 1.
 */
class ChooseGeneticCode extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.props.updateJobInfo('geneticCode', event.target.value)
  }

  render () {
    return (
      <div className="upload-div">
        <label id="geneticcode-content">Genetic Code<a href="/help#genetic-code" target="_blank"><sup>?</sup></a></label>
        <select name="gencodeid" onChange={this.handleChange} >

          <option value="1">
            Universal code
          </option>

          <option value="2">
            Vertebrate mitochondrial DNA code
          </option>

          <option value="3">
            Yeast mitochondrial DNA code
          </option>

          <option value="4">
            Mold, Protozoan and Coelenterate mt;
            Mycloplasma/Spiroplasma
          </option>

          <option value="5">
            Invertebrate mitochondrial DNA code
          </option>

          <option value="6">
            Ciliate, Dasycladacean and Hexamita Nuclear code
          </option>

          <option value="7">
            Echinoderm mitochondrial DNA code
          </option>

          <option value="8">
            Euplotid Nuclear code
          </option>

          <option value="9">
            Alternative Yeast Nuclear code
          </option>

          <option value="10">
            Ascidian mitochondrial DNA code
          </option>

          <option value="11">
            Flatworm mitochondrial DNA code
          </option>

          <option value="12">
            Blepharisma Nuclear code
          </option>

        </select> 
      </div>
    );
  }
}

module.exports.ChooseGeneticCode = ChooseGeneticCode;
