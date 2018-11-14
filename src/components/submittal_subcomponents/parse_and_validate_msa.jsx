import React, { Component } from "react";
const ipcRenderer = require("electron").ipcRenderer;
const extractTreeFromNexusOrFasta = require("./../../helpers/extract_tree_from_nexus_or_fasta.js");

class ParseAndValidateMSA extends Component {
  componentDidMount() {
    this.setEventListeners();
  }

  addUserSuppliedTreeStringToJobInfo = treeString => {
    // Used for FADE.
    // Passed in as the callback to the `extractTreeFromNexusOrFasta` function.
    this.props.updateJobInfo("tree", { user_supplied: treeString });
    this.props.changeJobSubmittalState("filePassedValidation", true);
    this.props.saveUnannotatedTree();
  };

  setEventListeners = () => {
    ipcRenderer.once("validationComplete", (event, arg) => {
      if (arg.message === "validator skipped for FADE") {
        extractTreeFromNexusOrFasta(
          this.props.jobInfo.msaPath,
          this.addUserSuppliedTreeStringToJobInfo
        );
        //this.props.updateJobInfo("tree", { user_supplied: '((me,you),us)' })
      } else if (arg.valid) {
        // Add info from the datareader.hbl output to the jobInfo.
        this.props.updateJobInfo("tree", {
          neighbor_joining: arg.message.FILE_INFO.nj,
          user_supplied: arg.message.FILE_PARTITION_INFO[0].usertree
          //partition_info: arg.message.FILE_PARTITION_INFO
        });
        this.props.changeJobSubmittalState("filePassedValidation", arg.valid);
        this.props.jobInfo.methodRequiresBranchSelection
          ? null
          : this.props.saveUnannotatedTree();
      } else {
        alert(arg.message);
      }
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.props.comm.send("parseAndValidateMSA", {
              jobInfo: this.props.jobInfo
            })
          }
        >
          Next
        </button>
      </div>
    );
  }
}

module.exports.ParseAndValidateMSA = ParseAndValidateMSA;
