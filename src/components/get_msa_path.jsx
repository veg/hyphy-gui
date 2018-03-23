import React, { Component } from 'react';
const { dialog } = require('electron').remote;

/** TODO: 
 * 1. Restyle... currently using what was on datamonkey.org.
 * 2. Get the file set to state
 */
class GetMSAPath extends Component {
  constructor(props) {
    super(props);
  }

  getFilePath = () => {
    var filePath = dialog.showOpenDialog()[0];
    this.props.updateJobInfo('msaPath', filePath);
  }

  render() {
    return (
      <div className="upload-div">
        <button onClick={this.getFilePath}>Choose File</button>
        {/* The below code is from progress bar on datamonkey.org
        <input id="seq-file" type="file" name="files" onChange={this.handleChange}/>
        <div id="file-progress" className="progress hidden">
          <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="1" aria-valuemax="100" >
            <span className="sr-only">0% Complete</span>
          </div>
        </div>*/}
      </div>
    );
  }
}

module.exports.GetMSAPath = GetMSAPath;
