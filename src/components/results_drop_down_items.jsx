import React, { Component } from 'react';


class ResultsDropDownItems extends Component {
  constructor(props) {
    super(props);
  }

  selectResult = (jobInfo) => {
    this.props.changeAppState('method', jobInfo.method);
    this.props.changeAppState('page', 'results');
  }

  render() {
    let resultsItems = [];
    for (var key in this.props.appState) {
      console.log(this.props.appState[key])
    }
    return(
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Results
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#" onClick={() => this.props.changeAppState('method', 'absrel')} >result goes here</a>
        </div>
      </li>
    )
  }
}

module.exports.ResultsDropDownItems = ResultsDropDownItems;
