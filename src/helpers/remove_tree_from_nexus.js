const fs = require("fs");

function removeTreeFromNexus(file_path, callback) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file_path, function(err, data) {
      if (err) reject(err);
      var file_lines = data.toString().split("\n"),
        begin_tree_index = file_lines.indexOf("BEGIN TREES;");
      if (file_lines[0] != "#NEXUS") {
        throw "removeTreeFromNexus can not be called on formats other than nexus";
      }
      if (begin_tree_index > -1) {
        var end_tree_index = file_lines.indexOf("END;", begin_tree_index),
          number_to_remove = end_tree_index - begin_tree_index + 1;
        if (/\s/.exec(file_lines[end_tree_index + 1])) {
          number_to_remove++;
        }
        file_lines.splice(begin_tree_index, number_to_remove);
      }
      var NexusStringWithoutTree = file_lines.join("\n");
      callback(NexusStringWithoutTree);
    });
  });
}

module.exports = removeTreeFromNexus;
