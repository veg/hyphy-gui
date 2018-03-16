const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');


function hyphyPortal(reactPortal) {
  const scriptPath = path.resolve('scripts', 'absrel.sh');
  const hyphyDirectory = path.resolve(__dirname, '.hyphy');
  const dataPath = path.resolve(__dirname, 'data', 'CD2.fna');
  const process = spawn('bash', [scriptPath, hyphyDirectory, dataPath]);

  process.stdout.on('data', (data) => {
    reactPortal(data.toString());
  });

  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`); // eslint-disable-line no-console
  });
}

function filePortal() {
  const jsonPath = path.resolve(__dirname, 'data', 'CD2.fna.ABSREL.json');
  const jsonData = fs.readFileSync(jsonPath).toString();
  return JSON.parse(jsonData);
}

renderApp({ // eslint-disable-line no-undef
  hyphy: hyphyPortal,
  file: filePortal,
});
