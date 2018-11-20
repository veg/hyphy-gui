import React, { PureComponent } from "react";
import { GetMSAPath } from "./submittal_subcomponents/get_msa_path.jsx";
import { ChooseGeneticCode } from "./submittal_subcomponents/choose_genetic_code.jsx";
import { ChooseSubstitutionModel } from "./submittal_subcomponents/choose_substitution_model.jsx";
import { ChoosePosteriorEstimationMethod } from "./submittal_subcomponents/choose_posterior_estimation_method.jsx";
import { ChooseAnalysisType } from "./submittal_subcomponents/choose_analysis_type.jsx";
import { ChooseSynRateVariation } from "./submittal_subcomponents/choose_syn_rate_variation.jsx";
import { ChooseSiteRateVariation } from "./submittal_subcomponents/choose_site_rate_variation.jsx";
import { ChooseNumRateClasses } from "./submittal_subcomponents/choose_num_rate_classes.jsx";
import { AdvancedFubarOptions } from "./submittal_subcomponents/advanced_fubar_options.jsx";
import { ParseAndValidateMSA } from "./submittal_subcomponents/parse_and_validate_msa.jsx";
import { BranchSelection } from "./submittal_subcomponents/branch_selection.jsx";
import methodSpecificInfo from "./../helpers/method_specific_info";

/**
 * JobSubmittal takes an MSA and some parameters and returns a JSON object "jobInfo" for consumption.
 * This component should recieve an "onSubmit" function as a prop which will likely be different for the GUI and
 * datamonkey.org.
 */
class JobSubmittal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jobInfo: {
        method: this.props.method,
        geneticCode: "1",
        // Note that initial/default value for other job info fields (i.e. the analysis type for RELAX) are set by
        // those specific field/button components (ChooseAnalysisType for RELAX) when those components mount.
        // This was done to allow for initial/default value for the fields to be set without creating an entry
        // in the state of methods that don't need/use the info.
        methodRequiresBranchSelection:
          methodSpecificInfo[this.props.method].branchSelection
      },
      filePassedValidation: false,
      branchSelectionSaved: false
    };
  }

  componentDidMount() {
    // Set the genetic code to null for FADE so that it can skip the datareader bach file.
    if (this.props.method === "fade") {
      this.updateJobInfo("geneticCode", null);
    }
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
    this.props.comm.send("saveAnnotatedTree", {
      annotatedTree: annotatedTree,
      msaPath: this.state.jobInfo.msaPath
    });
    this.setState({ branchSelectionSaved: true });
  };

  saveUnannotatedTree = () => {
    this.updateJobInfo("treePath", this.state.jobInfo.msaPath + ".tree");
    let user_supplied_tree = this.state.jobInfo.tree.user_supplied;
    let neighbor_joining_tree = this.state.jobInfo.tree.neighbor_joining;
    let unannotatedTree;
    user_supplied_tree == undefined
      ? (unannotatedTree = neighbor_joining_tree)
      : (unannotatedTree = user_supplied_tree);
    this.props.comm.send("saveUnannotatedTree", {
      unannotatedTree: unannotatedTree,
      msaPath: this.state.jobInfo.msaPath
    });
  };

  render() {
    const self = this;

    return (
      <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
        <h1>{methodSpecificInfo[self.props.method].name}</h1>
        <p>{methodSpecificInfo[self.props.method].description}</p>
        <GetMSAPath updateJobInfo={self.updateJobInfo} comm={self.props.comm} />

        {/* Method Specific Options */}
        {self.props.method != "fade" ? (
          <ChooseGeneticCode updateJobInfo={self.updateJobInfo} />
        ) : (
          <div>
            <p>
              Uploaded file must contain both an amino acid multiple sequence
              alignment and a rooted tree
            </p>
            <ChooseSubstitutionModel updateJobInfo={self.updateJobInfo} />
          </div>
        )}
        {self.props.method === "fade" || self.props.method === "fubar" ? (
          <ChoosePosteriorEstimationMethod updateJobInfo={self.updateJobInfo} />
        ) : null}
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
        {self.props.method === "fubar" || self.props.method === "fade" ? (
          <AdvancedFubarOptions updateJobInfo={self.updateJobInfo} />
        ) : null}
        {self.props.method === "relax" ? (
          <ChooseAnalysisType updateJobInfo={self.updateJobInfo} />
        ) : null}

        {self.state.filePassedValidation == false ? (
          <ParseAndValidateMSA
            jobInfo={self.state.jobInfo}
            comm={self.props.comm}
            changeJobSubmittalState={self.changeJobSubmittalState}
            updateJobInfo={self.updateJobInfo}
            saveUnannotatedTree={self.saveUnannotatedTree}
          />
        ) : null}

        {/* Branch Selection (if the method requires it) */}
        {this.state.jobInfo.methodRequiresBranchSelection &&
        self.state.filePassedValidation &&
        self.state.branchSelectionSaved == false ? (
          <BranchSelection
            userSuppliedNwkTree={this.state.jobInfo.tree.user_supplied}
            neighborJoiningNwkTree={this.state.jobInfo.tree.neighbor_joining}
            returnAnnotatedTreeCallback={this.saveBranchSelection}
            testAndReference={self.props.method === "relax" ? true : false}
            height={800}
            width={600}
          />
        ) : null}

        {/* Submit Job */}
        {self.state.branchSelectionSaved == true ||
        (methodSpecificInfo[self.props.method].branchSelection == false &&
          self.state.filePassedValidation) ? (
          <div>
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
