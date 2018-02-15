const fs = require('fs');

function node_portal(){
  fs.readFile('/Users/stephenshank/Documents/hyphy-gui/dist/test.txt', (err, data) => {
    console.log(data.toString());
  });
}

render_app(node_portal);
