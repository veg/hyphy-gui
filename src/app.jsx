import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "hyphy-vision/dist/hyphyvision.css";
const ipcRenderer = require("electron").ipcRenderer;
const _ = require("underscore");
const remote = require("electron").remote; // remote allows for using node modules within render process.
const { dialog } = remote;
const electronFs = remote.require("fs");
const { app } = require("electron").remote;
const path = require("path");
const moment = require("moment");

import { HyPhyGUINavBar } from "./components/navbar.jsx";
import { Home } from "./components/home.jsx";
import { JobSubmittal } from "./components/job_submittal.jsx";
import { JobProgress } from "./components/job_progress.jsx";
import { JobQueue } from "./components/job_queue.jsx";
import { Results } from "./components/results.jsx";
import { Citations } from "./components/citations.jsx";
import { Help } from "./components/help/help.jsx";

// Determine the environment and set the paths accordingly.
const environment = process.env.BASH_ENV ? "development" : "production";
const appStateDirectory =
  environment == "development"
    ? path.join(process.cwd())
    : path.resolve(app.getPath("userData"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
      method: null,
      jobsQueued: [],
      jobRunning: {},
      jobsCompleted: {},
      jobInFocus: null
    };
  }

  componentDidMount() {
    this.setEventListeners();
    // TODO: Use the async version of fs.exists and fs.readfile.
    if (electronFs.existsSync(path.join(appStateDirectory, ".appstate.json"))) {
      const savedAppState = JSON.parse(
        electronFs.readFileSync(
          path.join(appStateDirectory, ".appstate.json"),
          "utf8"
        )
      );
      delete savedAppState.page;
      delete savedAppState.method;
      delete savedAppState.jobInFocus;
      if (!_.isEmpty(savedAppState.jobRunning)) {
        const jobRunning = savedAppState.jobRunning;
        jobRunning.stdOut = "";
        const appState = savedAppState;
        appState.jobRunning = jobRunning;
        this.setState(appState);
        ipcRenderer.send("runAnalysis", { jobInfo: jobRunning });
      } else {
        this.setState(savedAppState);
      }
    }
  }

  componentDidUpdate(prevState) {
    // TODO: Have it only save the state when a job is submitted or completed.
    this.saveAppState();
  }

  setEventListeners = () => {
    const self = this;

    ipcRenderer.on("analysisComplete", (event, arg) => {
      let jobsCompletedUpdated = self.state.jobsCompleted;
      jobsCompletedUpdated[self.state.jobRunning.jobID] = self.state.jobRunning;
      self.setState({ jobsCompleted: jobsCompletedUpdated });
      if (!_.isEmpty(this.state.jobsQueued)) {
        let nextJob = self.state.jobsQueued.shift();
        self.setState({ jobRunning: nextJob });
        ipcRenderer.send("runAnalysis", { jobInfo: nextJob });
      } else {
        self.setState({ jobRunning: {} });
      }
    });

    ipcRenderer.on("stdout", (event, arg) => {
      // Check if the message being sent is new (the same message often gets sent more than once).
      if (arg.msg !== self.tempMessageForChecking) {
        let appendedStdOut = self.state.jobRunning.stdOut + arg.msg;
        let jobRunningInfo = self.state.jobRunning;
        jobRunningInfo.stdOut = appendedStdOut;
        self.setState({ jobRunning: jobRunningInfo });
        self.tempMessageForChecking = arg.msg;
      }
    });

    // Provide a message if there is a job running when the user tries to quit.
    let closeWindow = false;
    window.addEventListener("beforeunload", evt => {
      if (!_.isEmpty(this.state.jobRunning)) {
        if (closeWindow) return;
        evt.returnValue = false;
        setTimeout(() => {
          let result = dialog.showMessageBox({
            message:
              "The running HyPhy job will be terminated when the app is closed. Do you want to close the app?",
            buttons: ["Yes", "No"]
          });
          if (result == 0) {
            ipcRenderer.send("closeApp", null);
            closeWindow = true;
          }
        });
      }
    });
  };

  changeAppState = (stateToSet, valueToSet) => {
    /**
     * changeAppState is a function used to set the state of the App component from within other components.
     *
     * changeAppState is pased down as a prop to components and should be called with an arrow
     * function if in the render method to allow the passing of arguments.
     * For example: `onClick={() => self.props.changeAppState('exampleKeyForAppState', 'exampleValue')}
     */

    this.setState({ [stateToSet]: valueToSet });
  };

  saveAppState = () => {
    /**
     * Save the state of the app in the .state folder for reloading when the app is closed and reopened.
     * TODO: Use the async version of fs.writefile.
     */
    electronFs.writeFileSync(
      path.join(appStateDirectory, ".appstate.json"),
      JSON.stringify(this.state)
    );
  };

  tellMainToRunAnalysis = jobInfo => {
    /**
     * A function to send a message to the main process telling it to run a hyphy job.
     * comm sends "runAnalysis" to backend for processing.
     * A listener ("ipcMain.on") is listening for "runAnalysis" on the Main side.
     */

    // Add timeSubmitted to jobInfo.
    let timeSubmitted = moment().format();

    jobInfo["timeSubmitted"] = timeSubmitted;

    // Add jobID to jobInfo.
    jobInfo["jobID"] = [jobInfo.msaName, jobInfo.method, timeSubmitted].join(
      "_"
    );

    // Add jsonPath to jobInfo.
    jobInfo["jsonPath"] = [
      jobInfo.msaPath,
      jobInfo.method.toUpperCase(),
      "json"
    ].join(".");

    // Add fastaPath to jobInfo.
    jobInfo["fastaPath"] = jobInfo.msaPath + ".fasta";

    // Send the message to run the job or add to the queued job list.
    if (_.isEmpty(this.state.jobRunning)) {
      ipcRenderer.send("runAnalysis", { jobInfo: jobInfo });
      this.setState({ page: "jobProgress" });
      this.setState({ jobRunning: jobInfo });
      this.setState({ jobInFocus: jobInfo.jobID });
    } else {
      let QueuedJobsUpdated = this.state.jobsQueued;
      QueuedJobsUpdated.push(jobInfo);
      this.setState({ page: "jobQueue" });
      this.setState({ jobsQueued: QueuedJobsUpdated });
      this.setState({ method: null });
    }
  };

  // TODO: the page state, and thus the render, currently has sometimes unexpected behavior.
  // (e.g. goes to jobSubmittal when it should be at jobProgress)
  render() {
    var self = this;

    return (
      <div style={{ paddingTop: "70px" }}>
        <HyPhyGUINavBar changeAppState={self.changeAppState} />
        {this.state.page === "home" ? <Home /> : null}
        {this.state.page === "citations" ? <Citations /> : null}
        {this.state.page === "help" ? <Help /> : null}
        {this.state.page === "jobSubmittal" ? (
          <JobSubmittal
            comm={ipcRenderer}
            method={this.state.method}
            onSubmit={this.tellMainToRunAnalysis}
          />
        ) : null}
        {this.state.page === "jobProgress" ? (
          <JobProgress
            appState={self.state}
            changeAppState={self.changeAppState}
          />
        ) : null}
        {this.state.page === "jobQueue" ? (
          <JobQueue
            appState={self.state}
            changeAppState={self.changeAppState}
          />
        ) : null}
        {this.state.page === "results" ? (
          <Results jobInfo={self.state.jobsCompleted[self.state.jobInFocus]} />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
