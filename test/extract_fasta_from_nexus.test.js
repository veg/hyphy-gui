const extractFastaFromNexus = require("./../src/helpers/extract_fasta_from_nexus.js");
const path = require("path");
const fs = require("fs");

// Get the absolute paths to example datasets.
const dataPath = path.join(process.cwd(), "test", "test_data");
const nexusPath = path.join(dataPath, "CD2_reduced.nex");
const correctFastaPath = path.join(dataPath, "CD2_reduced.fasta");

// Setup.
let correctFastaString;
beforeAll(() => {
  return new Promise(resolve => {
    fs.readFile(correctFastaPath, function(err, data) {
      if (err) console.log(err); // eslint-disable-line
      correctFastaString = data.toString();
      resolve();
    });
  });
});

test("extractFastaFromNexus extracts the fasta from an example file", () => {
  extractFastaFromNexus(nexusPath, fastaString => {
    expect(fastaString).toBe(correctFastaString);
  });
});
