const { spawn } = require('child_process');


function node_portal(react_portal){
  const a_process = spawn('python',['sleep.py']);
  a_process.stdout.on('data', (data) => {
    react_portal(data.toString());
  });

  a_process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

render_app(node_portal);
