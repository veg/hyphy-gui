import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render(){
    return(<div>
      <h1>HyPhy</h1>
      <p>Hypothesis testing using phylogenies</p>
      <button onClick={()=>this.props.node_portal()}>Access node portal</button>
    </div>);
  }
}

function render_app(node_portal){
  ReactDOM.render(
    <App node_portal={node_portal} />,
    document.body.appendChild(document.createElement('div'))
  )
}

module.exports = render_app;
