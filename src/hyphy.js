const fs = require('fs'),
  { spawn } = require('child_process'),
  path = require('path');


function hyphy_portal(react_portal){
  const script_path = path.resolve('scripts', 'absrel.sh'),
    hyphy_directory = path.resolve(__dirname, '.hyphy'),
    data_path = path.resolve(__dirname, 'data', 'CD2.fna'),
    process = spawn('bash', [script_path, hyphy_directory, data_path]);

  process.stdout.on('data', (data) => {
    react_portal(data.toString());
  });

  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function file_portal() {
  const json_path = path.resolve(__dirname, 'data', 'CD2.fna.ABSREL.json'),
    json_data = fs.readFileSync(json_path).toString();
  return JSON.parse(json_data);
}

render_app({
  hyphy: hyphy_portal,
  file: file_portal
});
