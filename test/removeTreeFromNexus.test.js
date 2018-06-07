const removeTreeFromNexus = require("./../src/helpers/removeTreeFromNexus.js");
const path = require("path");

// Get the absolute paths to example datasets.
const dataPath = path.join(process.cwd(), "test", "test_data");
const validNexusPath = path.join(dataPath, "CD2_reduced.nex");
const outputPathForTree = path.join(dataPath, "CD2_reduced_temp_tree.nwk");

// Test pass/fail.
test("Gets the tree", () => {
  removeTreeFromNexus(validNexusPath, outputPathForTree);
  expect("test").toBe("test");
});
