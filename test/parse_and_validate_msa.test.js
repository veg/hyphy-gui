const parseAndValidateMSA = require("./../src/helpers/parse_and_validate_msa.js");
const path = require("path");
const fs = require("fs");

import { ParseAndValidateMSA } from "ParseAndValidateMSA"; // eslint-disable-line

/* Need to mock out IPC
// Test the component.
it('renders the ParseAndValidateMSA component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ParseAndValidateMSA/>, div);
});
*/

// Test the function.

// Get the absolute paths to example datasets.
const dataPath = path.join(process.cwd(), "test", "test_data");
const validMSAPath = path.join(dataPath, "CD2_reduced.fna");
const validMSAPathCopy = path.join(dataPath, "CD2_reduced_copy.fna");
const validMSAPathNexus = path.join(dataPath, "CD2_reduced.nex");
const validMSAPathCopyNexus = path.join(dataPath, "CD2_reduced_copy.nex");
const stopCodonMSAPath = path.join(dataPath, "CD2_reduced_stopcodon.fasta");

// Setup and tear down because parseAndValidateMSA changes the file to nexus in place.
beforeAll(() => {
  return new Promise(resolve => {
    fs.copyFile(validMSAPath, validMSAPathCopy, err => {});
    fs.copyFile(validMSAPathNexus, validMSAPathCopyNexus, err => {});
    resolve();
  });
});

afterAll(() => {
  return new Promise(resolve => {
    fs.unlink(validMSAPathCopy, () => {});
    fs.unlink(validMSAPathCopyNexus, () => {});
    resolve();
  });
});

// Test valid/invalid.
test("Passes with valid fna file", () => {
  parseAndValidateMSA(validMSAPathCopy, "1", validationOutput => {
    expect(validationOutput.valid).toBe(true);
  });
});

test("Passes with valid nexus file", () => {
  parseAndValidateMSA(validMSAPathCopyNexus, "1", validationOutput => {
    expect(validationOutput.valid).toBe(true);
  });
});

test("Fails with file with stop codon", () => {
  parseAndValidateMSA(stopCodonMSAPath, "1", validationOutput => {
    expect(validationOutput.valid).toBe(false);
  });
});

test("Fails with incorrect path", () => {
  parseAndValidateMSA("./exampleIncorrectPath", "1", validationOutput => {
    expect(validationOutput.valid).toBe(false);
  });
});

// Test validation output messages.
test("Returns expected output message when a stop codon is encountered", () => {
  parseAndValidateMSA(stopCodonMSAPath, "1", validationOutput => {
    expect(validationOutput.message).toBe(
      "1 stop codons found (detailed report below). Please double-check your alignment and ensure that only coding data are present and that the correct genetic code is selected."
    );
  });
});
