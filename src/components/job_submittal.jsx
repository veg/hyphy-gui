import React, { Component } from "react";
const ipcRenderer = require("electron").ipcRenderer;
import { GetMSAPath } from "./submittal_subcomponents/get_msa_path.jsx";
import { ChooseGeneticCode } from "./submittal_subcomponents/choose_genetic_code.jsx";
import { ChooseAnalysisType } from "./submittal_subcomponents/choose_analysis_type.jsx";
import { ChooseSynRateVariation } from "./submittal_subcomponents/choose_syn_rate_variation.jsx";
import { ChooseSiteRateVariation } from "./submittal_subcomponents/choose_site_rate_variation.jsx";
import { ChooseNumRateClasses } from "./submittal_subcomponents/choose_num_rate_classes.jsx";
import { AdvancedFubarOptions } from "./submittal_subcomponents/advanced_fubar_options.jsx";
import { ParseAndValidateMSA } from "./submittal_subcomponents/parse_and_validate_msa.jsx";
import { BranchSelection } from "./submittal_subcomponents/branch_selection.jsx";

/**
 * JobSubmittal takes an MSA and some parameters and returns a JSON object "jobInfo" for consumption.
 * This component should recieve an "onSubmit" function as a prop which will likely be different for the GUI and
 * datamonkey.org.
 */
class JobSubmittal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobInfo: {
        method: this.props.method,
        geneticCode: "1"
        // Note that initial/default value for other job info fields (i.e. the analysis type for RELAX) are set by
        // those specific field/button components (ChooseAnalysisType for RELAX) when those components mount.
        // This was done to allow for initial/default value for the fields to be set without creating an entry
        // in the state of methods that don't need/use the info.
      },
      filePassedValidation: false,
      branchSelectionSaved: false
    };
  }

  updateJobInfo = (key, value) => {
    /**
     * This method is passed down to the individual fields/button components so that they can
     * set the jobInfo property of the JobSubmittal components state.
     */
    this.setState({});
    this.state.jobInfo[key] = value;

    if (key == "geneticCode" || key == "msaPath") {
      this.setState({ filePassedValidation: false });
    }
  };

  changeJobSubmittalState = (key, value) => {
    this.setState({ [key]: value });
  };

  saveBranchSelection = annotatedTree => {
    this.updateJobInfo("annotatedTree", annotatedTree);
    this.updateJobInfo("treePath", this.state.jobInfo.msaPath + ".tree");
    ipcRenderer.send("saveAnnotatedTree", {
      annotatedTree: annotatedTree,
      msaPath: this.state.jobInfo.msaPath
    });
    this.setState({ branchSelectionSaved: true });
  };

  render() {
    const self = this;
    const methodNameandDescription = {
      absrel: {
        name: "aBSREL",
        description:
          "An adaptive branch-site REL test for episodic diversification"
      },
      busted: {
        name: "BUSTED",
        description:
          "Branch-site Unrestricted Statistical Test for Episodic Diversification"
      },
      fel: { name: "FEL", description: "Fixed Effects Likelihood" },
      fubar: {
        name: "FUBAR",
        description:
          "A Fast, Unconstrained Bayesian AppRoximation for Inferring Selection"
      },
      gard: {
        name: "GARD",
        description: "A Genetic Algorithm for Recombination Detection"
      },
      meme: {
        name: "MEME",
        description:
          "Detect Individual Sites Subject to Episodic Diversifying Selection"
      },
      relax: {
        name: "RELAX",
        description:
          "Detect relaxed selection in a codon-based phylogenetic framework"
      },
      slac: { name: "SLAC", description: "Single-Likelihood Ancestor Counting" }
    };

    return (
      <div>
        <h1>{methodNameandDescription[self.props.method].name}</h1>
        <p>{methodNameandDescription[self.props.method].description}</p>
        {self.props.platform === "electron" ? (
          <GetMSAPath updateJobInfo={self.updateJobInfo} />
        ) : null}
        <ChooseGeneticCode updateJobInfo={self.updateJobInfo} />

        {/* Method Specific Options */}
        {self.props.method === "fel" ? (
          <ChooseSynRateVariation updateJobInfo={self.updateJobInfo} />
        ) : null}
        {self.props.method === "gard"
          ? [
              <ChooseSiteRateVariation updateJobInfo={self.updateJobInfo} />,
              <ChooseNumRateClasses updateJobInfo={self.updateJobInfo} />,
              <div>Can't run gard yet... need an MPI environment to run.</div>
            ]
          : null}
        {self.props.method === "fubar" ? (
          <AdvancedFubarOptions updateJobInfo={self.updateJobInfo} />
        ) : null}
        {self.props.method === "relax" ? (
          <ChooseAnalysisType updateJobInfo={self.updateJobInfo} />
        ) : null}

        {self.state.filePassedValidation == false ? (
          <ParseAndValidateMSA
            jobInfo={self.state.jobInfo}
            changeJobSubmittalState={self.changeJobSubmittalState}
            updateJobInfo={self.updateJobInfo}
          />
        ) : null}

        {/* Branch Selection 
        TODO: the Branch Selection component shouldn't appear for methods that don't require branch selection. Currently just set up for absrel.*/}
        {self.state.filePassedValidation == true &&
        self.state.branchSelectionSaved == false ? (
          <BranchSelection
            tree={this.state.jobInfo.tree}
            returnAnnotatedTreeCallback={this.saveBranchSelection}
            testAndReference={true}
            height={800}
            width={600}
          />
        ) : null}
        {self.state.branchSelectionSaved == true ? (
          <div>
            <p>Branch Selection Information Saved</p>
            <button onClick={() => self.props.onSubmit(self.state.jobInfo)}>
              Submit Analysis
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

module.exports.JobSubmittal = JobSubmittal;
