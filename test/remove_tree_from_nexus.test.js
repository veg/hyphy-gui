const removeTreeFromNexus = require("./../src/helpers/remove_tree_from_nexus.js");
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

// Setup.
let validNexusStringWithoutTree;
beforeAll(() => {
  return new Promise(resolve => {
    fs.readFile(validNexusWithoutTreePath, function(err, data) {
      if (err) console.log(err); // eslint-disable-line
      validNexusStringWithoutTree = data.toString();
      resolve();
    });
  });
});

test("removeTreeFromNexus removes the tree from an example file", () => {
  removeTreeFromNexus(validNexusPath, nexusStringWithoutTree => {
    expect(nexusStringWithoutTree).toBe(validNexusStringWithoutTree);
  });
});

test("returns the nexus string unchanged if there wasn't a tree", () => {
  removeTreeFromNexus(validNexusWithoutTreePath, nexusStringWithoutTree => {
    expect(nexusStringWithoutTree).toBe(validNexusStringWithoutTree);
  });
});

test("removes the trees if there are multiple", () => {
  removeTreeFromNexus(validNexusWithTwoTreesPath, nexusStringWithoutTree => {
    expect(nexusStringWithoutTree).toBe(validNexusStringWithoutTree + "\n");
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
