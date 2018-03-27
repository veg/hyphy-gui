import React, { Component } from 'react';
const headerLogo = require('../../images/header-logo.svg');
import { ResultsDropDownItems } from './results_drop_down_items.jsx';


class HyPhyGUINavBar extends Component {
  constructor(props) {
    super(props);
  }

  goHome = () => {
    this.props.changeAppState('page', 'home');
    this.props.changeAppState('method', null);
    this.props.changeAppState('jobInFocus', null);
  }

  openNewJobSubmittalPage = (method) => {
    this.props.changeAppState('page', 'jobSubmittal');
    this.props.changeAppState('method', method);
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={headerLogo} height="30px" onClick={this.goHome} />
        </a>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <ResultsDropDownItems changeAppState={this.props.changeAppState} resultsList={this.props.appState.jobInfoList} /> 
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Tools and Methods
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('absrel')} >aBSREL</a>
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('relax')} >RELAX</a>
                <a className="dropdown-item" href="#">Other Methods to go Here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">All Methods</a>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Citations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Help</a>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
}

module.exports.HyPhyGUINavBar = HyPhyGUINavBar;
