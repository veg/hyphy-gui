import React, { Component } from "react";
const headerLogo = require("../../images/header-logo.svg");

class HyPhyGUINavBar extends Component {
  constructor(props) {
    super(props);
  }

  openMethodAgnosticPage = page => {
    this.props.changeAppState("page", page);
    this.props.changeAppState("method", null);
    this.props.changeAppState("jobInFocus", null);
  };

  openNewJobSubmittalPage = method => {
    this.props.changeAppState("page", "jobSubmittal");
    this.props.changeAppState("method", method);
    this.props.changeAppState("jobInFocus", null);
  };

  render() {
    return (
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
        id="gui-navbar"
      >
        <a className="navbar-brand" href="#">
          <img
            src={headerLogo}
            height="30px"
            onClick={() => this.openMethodAgnosticPage("home")}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tools and Methods
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.openNewJobSubmittalPage("absrel")}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  aBSREL
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.openNewJobSubmittalPage("busted")}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  BUSTED
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.openNewJobSubmittalPage("fel")}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  FEL
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.openNewJobSubmittalPage("fubar")}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  FUBAR
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.openNewJobSubmittalPage("meme")}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  MEME
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.openNewJobSubmittalPage("relax")}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  RELAX
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.openNewJobSubmittalPage("slac")}
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  SLAC
                </a>
              </div>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => this.openMethodAgnosticPage("jobQueue")}
                href="#"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Jobs
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => this.openMethodAgnosticPage("citations")}
                href="#"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Citations
              </a>
            </li>
            {/*
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => this.openMethodAgnosticPage("help")}
                href="#"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Help
              </a>
            </li>
            */}
          </ul>
        </div>
      </nav>
    );
  }
}

module.exports.HyPhyGUINavBar = HyPhyGUINavBar;
