const fs = require("fs");

function extractFastaFromNexus(file_path, callback) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file_path, function(err, data) {
      if (err) reject(err);
      if (data.toString().split("\n")[0] != "#NEXUS") {
        // If the file is not a nexus we will assume it is fasta (phylib support to come)
        const fastaString = data.toString();
        callback(fastaString);
      } else {
        const split_data = data.toString().split("\n"),
          start_index = split_data.indexOf("MATRIX") + 1,
          end_index = split_data.indexOf("END;", start_index),
          tax_labels_index = split_data.indexOf("\tTAXLABELS") + 1,
          tax_labels = split_data[tax_labels_index]
            .slice(0, -1)
            .trim()
            .split(" ")
            .map(name => name.slice(1, -1));
        const fastaString =
          split_data
            .slice(start_index, end_index)
            .map((line, index) => {
              const header = ">" + tax_labels[index],
                sequence = line.trim().replace(";", "");
              return [header, sequence].join("\n");
            })
            .join("\n") + "\n";

        callback(fastaString);
      }
    });
  });
}

module.exports = extractFastaFromNexus;
