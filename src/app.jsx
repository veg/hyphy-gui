import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

const ReactMarkdown = require('react-markdown');
const hyphyVision = require('hyphy-vision');

const BSREL = hyphyVision.absrel.BSREL;

function Table(props) {
  return <table className="table table-striped">{props.children}</table>;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', json: undefined };
  }
  componentDidMount() {
    const json = this.props.nodePortal.file();
    this.setState({ json }); // eslint-disable-line
  }
  accessHyPhy() {
    const data = this.props.nodePortal.hyphy((data) => { // eslint-disable-line
      const newMessage = this.state.message + data;
      this.setState({ message: newMessage });
    });
  }
  render() {
    return (
      <div>
        <h1>HyPhy</h1>
        <p>Hypothesis testing using phylogenies</p>
        <button onClick={() => this.accessHyPhy()}>Access node portal</button>
        <ReactMarkdown source={this.state.message} renderers={{ table: Table }} />
        <BSREL data={this.state.json} />
        <div id="absrel" />
      </div>
    );
  }
}

function renderApp(nodePortal) {
  ReactDOM.render(
    <App nodePortal={nodePortal} />,
    document.body.appendChild(document.createElement('div')), // eslint-disable-line
  );
}

module.exports = renderApp;

