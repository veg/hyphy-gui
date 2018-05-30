import React, { Component } from 'react';
const headerLogo = require('../../images/header-logo.svg');


class HyPhyGUINavBar extends Component {
  constructor(props) {
    super(props);
  }

  openHomePage = () => {
    this.props.changeAppState('page', 'home');
    this.props.changeAppState('method', null);
    this.props.changeAppState('jobInFocus', null);
  }

  openNewJobSubmittalPage = (method) => {
    this.props.changeAppState('page', 'jobSubmittal');
    this.props.changeAppState('method', method);
    this.props.changeAppState('jobInFocus', null);
  }

  openJobQueuePage = () => {
    this.props.changeAppState('page', 'jobQueue');
    this.props.changeAppState('method', null);
    this.props.changeAppState('jobInFocus', null);
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={headerLogo} height="30px" onClick={this.openHomePage} />
        </a>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Tools and Methods
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('absrel')} >aBSREL</a>
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('busted')} >BUSTED</a>
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('fel')} >FEL</a>
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('fubar')} >FUBAR</a>
                {/* <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('gard')} >GARD</a> */}
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('meme')} >MEME</a>
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('relax')} >RELAX</a>
                <a className="dropdown-item" href="#" onClick={() => this.openNewJobSubmittalPage('slac')} >SLAC</a>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link" onClick={this.openJobQueuePage} href="#">Jobs</a>
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
