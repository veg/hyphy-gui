/* eslint-disable */
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = require('electron').ipcMain;

const path = require('path')
const url = require('url')
const fs = require('fs');
const { spawn } = require('child_process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  // Add the React DevTools (currently has path hard coded).
  if (fs.existsSync('/Users/ryanvelazquez/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.0_0')) {
    BrowserWindow.addDevToolsExtension(
      '/Users/ryanvelazquez/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.0_0'
    );
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 800})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/**
 * =====================================================================================
 * End of Boilerplate file from electron-quick-start.
 * The code below is for communicating between the main and render processes.
 * =====================================================================================
 */

// Run an analysis.
ipcMain.on('runAnalysis', function(event, arg) {
  changeMSALocation(arg.jobInfo);
  runAnalysisScript(arg.jobInfo);
});

function changeMSALocation(jobInfo) {
  // TODO: The file should probably be moved when the job is submitted, not when the analysis is run.
  fs.createReadStream(jobInfo.msaPathOriginal).pipe(fs.createWriteStream(jobInfo.msaPath));
    //fs.rename(jobInfo.msaPathOriginal, jobInfo.msaPath, (err) => {
    //if (err) throw err;
    //});
}

function runAnalysisScript(jobInfo) {
  const scriptPath = path.resolve('./scripts', (jobInfo.method + '.sh'));
  const hyphyDirectory = path.resolve('./', '.hyphy');
  let process = null;
  if (jobInfo.method === 'relax') {
    process = spawn('bash', [scriptPath, hyphyDirectory, jobInfo.msaPath, jobInfo.geneticCode, jobInfo.analysisType]);
  } else if (jobInfo.method === 'fel') {
    process = spawn('bash', [scriptPath, hyphyDirectory, jobInfo.msaPath, jobInfo.geneticCode, jobInfo.synRateVariation]);
  } else if (jobInfo.method === 'fubar') {
    process = spawn('bash', [scriptPath, hyphyDirectory, jobInfo.msaPath, jobInfo.geneticCode, jobInfo.gridPoints, jobInfo.chainLength, jobInfo.MCMCChains, jobInfo.burnInSamples, jobInfo.samplesFromEachChain, jobInfo.concDirichletPrior]);
  } else if (jobInfo.method === 'gard') {
    process = spawn('bash', [scriptPath, hyphyDirectory, jobInfo.msaPath, jobInfo.geneticCode, jobInfo.siteRateVariation, jobInfo.numRateClasses]);
  } else {
    process = spawn('bash', [scriptPath, hyphyDirectory, jobInfo.msaPath, jobInfo.geneticCode]);
  }


  // Send the stdout to the render window which can listen for 'stdout'.
  process.stdout.on('data', (data) => {
    console.log(data.toString());
    mainWindow.webContents.send('stdout', {msg: data.toString()});
  });

  // Let the render window know when the analysis is done.
  process.on('close', (code) => {
    mainWindow.webContents.send('analysisComplete', {msg: jobInfo});
  });
}
