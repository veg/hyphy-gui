import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const ReactMarkdown = require('react-markdown')

import 'bootstrap/dist/css/bootstrap.css';


function Table(props){
  return <table className="table table-striped">{props.children}</table>;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = { message: '' };
  }
  accessNodePortal(){
    this.props.node_portal(data => {
      const new_message = this.state.message + data;
      this.setState({message: new_message});
    });
  }
  render(){
    return(<div>
      <h1>HyPhy</h1>
      <p>Hypothesis testing using phylogenies</p>
      <button onClick={()=>this.accessNodePortal()}>Access node portal</button>
      <ReactMarkdown source={this.state.message} renderers={{table: Table}}/>
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

