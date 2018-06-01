import React, { Component } from "react";
const ipcRenderer = require("electron").ipcRenderer;

class JobsTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div />
        <h3>{this.props.title}</h3>
        <table className="table table-bordered table-hover">
          <tr>
            <th scope="col">MSA File</th>
            <th scope="col">Method</th>
            <th scope="col">Submitted</th>
          </tr>
          {this.props.rows}
        </table>
      </div>
    );
  }
}

module.exports.JobsTable = JobsTable;
