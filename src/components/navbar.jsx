import React, { Component } from 'react';

const headerLogo = require('../../images/header-logo.svg');

class HyPhyGUINavBar extends Component {
  constructor(props) {
    super(props);
  }

  openNewJobSubmittalPage = (method) => {
    this.props.changeAppState('page', 'jobSubmittal');
    this.props.changeAppState('method', method);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={headerLogo} height="30px" onClick={() => this.props.changeAppState('page', 'home')} />
        </a>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Tools and Methods
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('absrel')} >aBSREL</a>
                <a className="dropdown-item" href="#">Other Methods to go Here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">All Methods</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Data
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#"></a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#"></a>
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
