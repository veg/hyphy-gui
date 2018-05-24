import React, { Component } from 'react';
const ipcRenderer = require('electron').ipcRenderer;

class ValidateFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobInfo: this.props.jobInfo,
      validationOutput: '',
      filePassedValidation: false,
      validationOutputComplete: false,
    };
  }

  componentDidMount() {
    this.setEventListeners();
  }
  
  validateFile = (jobInfo) => {
    // Tell main to run a HBL script to validate the input file.
    ipcRenderer.send('validateMSA', {jobInfo: jobInfo});
  }

  setEventListeners = () => {
    const self = this;

    ipcRenderer.on('validationOutput', (event, arg) => {

      // Delete the old validation output if this a validation of a new file.
      if (this.state.validationOutputComplete) {
        this.state.validationOutput = '';
        self.setState({validationOutputComplete: false});
      }

      let appendedValidationOutput = self.state.validationOutput + arg.msg;
      self.setState({validationOutput: appendedValidationOutput});
    }); 

    ipcRenderer.on('validationComplete', (event, arg) => {
      if (self.state.validationOutput) {
        // Remove the first few lines from the validation output (the first few lines are just the file path and geneticCode; we want the object, {}). 
        let strippedValidationOutput = self.state.validationOutput.substring(self.state.validationOutput.indexOf("{") );

        let results = ""
        try {
          results = JSON.parse(strippedValidationOutput);
        } catch (e) {
          alert(
            "An unexpected error occured when parsing the sequence alignment! Here is the full traceback : " +
              strippedValidationOutput,
            {}
          );
          self.setState({filePassedValidation: false});
        }

        if (results) {
          if ("error" in results) {
            alert(results.error, "");
            self.setState({filePassedValidation: false});
          } else {
            self.setState({filePassedValidation: true});
          }
        }

        self.setState({validationOutputComplete: true});
        self.props.changeJobSubmittalState('filePassedValidation', self.state.filePassedValidation)
      }
    });

  }

  render() {
    const self = this;
    return (
      <div>
        <button onClick={() => self.validateFile(self.state.jobInfo)}>Next</button>
      </div>
    );
  }
}

module.exports.ValidateFile = ValidateFile;
