const { spawn } = require('child_process');


function validateMSA(msaPath, geneticCode, callBack) {
  // Takes an msaFilePath, a geneticCode and a callback function.
  // Returns an object: {valid: true or false, 
  //                     message: the output from the validation or, if there was an error, the error message}.

  // The file is validated with the `datareader.bf` HBL script.
  let geneticCodeLessOne = parseInt(geneticCode) - 1 // The batch file counts from zero, everything else seems to count from one.
  let validationProcess = spawn('HYPHYMP', ['./src/helpers/bfs/datareader.bf', msaPath, geneticCodeLessOne] )

  // Record the output from the HBL script.
  let validationOutput = '';
  validationProcess.stdout.on('data', (data) => {
    validationOutput += data.toString();
  });

  // When the HBL finishes, evaluate the output.
  validationProcess.on('close', (code) => {
    let valid = true;
    let message = '';

    if (validationOutput != '') {
      // Remove the first few lines from the validation output (the first few lines are just the file path and geneticCode; we want the object, {}). 
      let strippedValidationOutput = validationOutput.substring(validationOutput.indexOf("{") );

      try {
        message = JSON.parse(strippedValidationOutput);
      } catch (e) {
        message = "An unexpected error occured when parsing the sequence alignment! Here is the full traceback : " + strippedValidationOutput
        valid = false;
      }

      if (typeof(message) == "object") {
        if ("error" in message) {
          valid = false;
          message =  message.error;
        }
      }

    } else {
      valid = false;
      message = 'An error occured when parsing the sequence alignment. There was no validation output.'
    }

    let validationResponse = {'valid': valid, 'message': message};
    callBack(validationResponse)
  });
}

module.exports = validateMSA;
