const fs = require("fs");

function extractTreeFromNexusOrFasta(file_path, callback) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file_path, function(err, data) {
      if (err) reject(err);
      var file_lines = data.toString().split("\n");
      var treeString;
      if (file_lines[0] != "#NEXUS") {
        // If the file is not a nexus we will assume it is fasta (phylib support to come)
        // tree lines, lines that start with "(".
        for (var i = 0; i < file_lines.length; i++) {
          if (file_lines[i].startsWith("(")) {
            treeString = file_lines[i];
          }
        }
        callback(treeString);
      } else {
        // TODO: this currently just pulls out the first tree. It should somehow handle multiple.
        for (let i = 0; i < file_lines.length; i++) {
          if (file_lines[i].startsWith("BEGIN TREES")) {
            var firstTreeLine = file_lines[i + 1];
            treeString = firstTreeLine.split("=")[1];
          }
        }
        callback(treeString);
      }
    });
  });
}

module.exports = extractTreeFromNexusOrFasta;
