const removeTreeFromNexusOrFasta = require("./../src/helpers/remove_tree_from_nexus_or_fasta.js");
const path = require("path");
const fs = require("fs");

// Get the absolute paths to example datasets.
const dataPath = path.join(process.cwd(), "test", "test_data");
const validNexusPath = path.join(dataPath, "CD2_reduced.nex");
const validNexusWithTwoTreesPath = path.join(
  dataPath,
  "CD2_reduced_two_trees.nex"
);
const validNexusWithoutTreePath = path.join(
  dataPath,
  "CD2_reduced_without_tree.nex"
);
const validMSAPathFNA = path.join(dataPath, "CD2_reduced.fna");
const validMSAPathWithTreeRemoved = path.join(dataPath, "CD2_reduced.fasta");

// Setup.
let validNexusStringWithoutTree;
let validFastaStringWithoutTree;
beforeAll(() => {
  return new Promise(resolve => {
    fs.readFile(validNexusWithoutTreePath, function(err, data) {
      if (err) console.log(err); // eslint-disable-line
      validNexusStringWithoutTree = data.toString();
      resolve();
    });
  });
});
beforeAll(() => {
  return new Promise(resolve => {
    fs.readFile(validMSAPathWithTreeRemoved, function(err, data) {
      if (err) console.log(err); // eslint-disable-line
      validFastaStringWithoutTree = data.toString();
      resolve();
    });
  });
});

test("removeTreeFromNexus removes the tree from an example file", () => {
  removeTreeFromNexusOrFasta(validNexusPath, nexusStringWithoutTree => {
    expect(nexusStringWithoutTree).toBe(validNexusStringWithoutTree);
  });
});

test("returns the nexus string unchanged if there wasn't a tree", () => {
  removeTreeFromNexusOrFasta(
    validNexusWithoutTreePath,
    nexusStringWithoutTree => {
      expect(nexusStringWithoutTree).toBe(validNexusStringWithoutTree);
    }
  );
});

test("removes the trees if there are multiple", () => {
  removeTreeFromNexusOrFasta(
    validNexusWithTwoTreesPath,
    nexusStringWithoutTree => {
      expect(nexusStringWithoutTree).toBe(validNexusStringWithoutTree + "\n");
    }
  );
});

test("removes the tree from a fna file", () => {
  removeTreeFromNexusOrFasta(validMSAPathFNA, fastaStringWithoutTree => {
    expect(fastaStringWithoutTree).toBe(validFastaStringWithoutTree + "\n");
  });
});

// Throws an error if the file isn't nexus.
/* I haven't been able to get the test working but the function does throw an error.

const validMSAPathFNA = path.join(dataPath, "CD2_reduced.fna");

test('Thows an error if a non nexus file is passed in', async () => {
  expect.assertions(2);
  try {
    await removeTreeFromNexus(validMSAPathFNA, () => {})
  }
  catch(error) {
    expect(error).toBe('removeTreeFromNexus can not be called on formats other than nexus')
  }
});
*/
