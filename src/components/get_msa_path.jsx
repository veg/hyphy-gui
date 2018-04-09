import React, { Component } from 'react';
const { dialog } = require('electron').remote;


class GetMSAPath extends Component {
  constructor(props) {
    super(props);
  }

  getFilePath = () => {
    var filePath = dialog.showOpenDialog()[0];
    this.props.updateJobInfo('msaPathOriginal', filePath);
    this.props.updateJobInfo('msaName', filePath.replace(/^.*[\\\/]/, ''));
  }

  render() {
    return (
      <div className="upload-div">
        <button onClick={this.getFilePath}>Choose File</button>
      </div>
    );
  }
}

module.exports.GetMSAPath = GetMSAPath;
