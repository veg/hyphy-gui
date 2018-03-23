import React from 'react';


/** TODO: 
 * 1. Restyle... currently using what was on datamonkey.org.
 * 2. Get the file set to state
 */
function ChooseAnalysisType(props) {
  return (
    <div className="select-element">
      <label id="analysis-content">Analysis Type<a href="/help#relax-analysis-types" target="_blank"><sup>?</sup></a></label>
      <select id="analysis-type">
        <option selected="" value="1">
          All
        </option>
        <option value="2">
          Minimal
        </option>
      </select>
    </div>
  );
}

module.exports.ChooseAnalysisType = ChooseAnalysisType;
