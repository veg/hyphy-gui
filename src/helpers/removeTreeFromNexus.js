const path = require("path");
const fs = require("fs");

function removeTreeFromNexus(input_file_path, output_file_path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(input_file_path, function(err, data) {
      if (err) reject(err);
      var file_lines = data.toString().split("\n"),
        begin_tree_index = file_lines.indexOf("BEGIN TREES;");
      if (begin_tree_index > -1) {
        var end_tree_index = file_lines.indexOf("END;", begin_tree_index),
          number_to_remove = end_tree_index - begin_tree_index + 1;
        if (/\s/.exec(file_lines[end_tree_index + 1])) {
          number_to_remove++;
        }

        file_lines.splice(begin_tree_index, number_to_remove);
      }
      fs.writeFile(output_file_path, file_lines.join("\n"), function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  });
}

module.exports = removeTreeFromNexus;
