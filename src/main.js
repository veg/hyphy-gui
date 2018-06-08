/* eslint-disable */
const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require("electron").ipcMain;
const path = require("path");
const url = require("url");
const fs = require("fs");
const { spawn } = require("child_process");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");

const parseAndValidateMSA = require("./helpers/parse_and_validate_msa.js");
const removeTreeFromNexus = require("./helpers/remove_tree_from_nexus.js");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Add the React DevTools.
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1400, height: 800 });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/**
 * =====================================================================================
 * End of Boilerplate file from electron-quick-start.
 * The code below is for communicating between the main and render processes.
 * =====================================================================================
 */

// Move the msa file from it's original location to the .data folder.
ipcMain.on("moveMSA", function(event, arg) {
  fs.createReadStream(arg.msaPathOriginal).pipe(
    fs.createWriteStream(arg.msaPath)
  );
});

// Validate an MSA file.
ipcMain.on("parseAndValidateMSA", function(event, arg) {
  parseAndValidateMSA(
    arg.jobInfo.msaPath,
    arg.jobInfo.geneticCode,
    sendValidationToRender
  );
});
// Helper function passed as a callback to parseAndValidateMSA {which is called above}.
function sendValidationToRender(validationResponse) {
  mainWindow.webContents.send("validationComplete", validationResponse);
}

// Save the annotated tree from the branch selection component and remove the tree from the nexus file.
ipcMain.on("saveAnnotatedTree", function(evnet, arg) {
  fs.writeFile(arg.msaPath + ".tree", arg.annotatedTree, function(err) {
    if (err) throw err;
  });
  removeTreeFromNexus(arg.msaPath, nexusStringWithoutTree => {
    fs.writeFile(arg.msaPath, nexusStringWithoutTree, function(err) {
      if (err) throw err;
    });
  });
});

// Run an analysis.
ipcMain.on("runAnalysis", function(event, arg) {
  runAnalysisScript(arg.jobInfo);
});

function runAnalysisScript(jobInfo) {
  const scriptPath = path.resolve("./scripts", jobInfo.method + ".sh");
  const hyphyDirectory = path.resolve("./", ".hyphy");
  let process = null;
  // TODO: adjust the scripts and parameters to account for which methods get trees and which don't (currently just working on absrel).
  if (jobInfo.method === "relax") {
    process = spawn("bash", [
      scriptPath,
      hyphyDirectory,
      jobInfo.msaPath,
      jobInfo.geneticCode,
      jobInfo.analysisType
    ]);
  } else if (jobInfo.method === "fel") {
    process = spawn("bash", [
      scriptPath,
      hyphyDirectory,
      jobInfo.msaPath,
      jobInfo.geneticCode,
      jobInfo.synRateVariation
    ]);
  } else if (jobInfo.method === "fubar") {
    process = spawn("bash", [
      scriptPath,
      hyphyDirectory,
      jobInfo.msaPath,
      jobInfo.geneticCode,
      jobInfo.gridPoints,
      jobInfo.chainLength,
      jobInfo.MCMCChains,
      jobInfo.burnInSamples,
      jobInfo.samplesFromEachChain,
      jobInfo.concDirichletPrior
    ]);
  } else if (jobInfo.method === "gard") {
    process = spawn("bash", [
      scriptPath,
      hyphyDirectory,
      jobInfo.msaPath,
      jobInfo.geneticCode,
      jobInfo.siteRateVariation,
      jobInfo.numRateClasses
    ]);
  } else {
    process = spawn("bash", [
      scriptPath,
      hyphyDirectory,
      jobInfo.msaPath,
      jobInfo.treePath,
      jobInfo.geneticCode
    ]);
  }

  // Send the stdout to the render window which can listen for 'stdout'.
  process.stdout.on("data", data => {
    console.log(data.toString());
    mainWindow.webContents.send("stdout", { msg: data.toString() });
  });

  // Let the render window know when the analysis is done.
  process.on("close", code => {
    mainWindow.webContents.send("analysisComplete", { msg: jobInfo });
  });
}
