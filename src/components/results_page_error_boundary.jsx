import React from "react";

class ResultsPageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    this.setState({ error: JSON.stringify(error) });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3 style={{ paddingBottom: "20px", textAlign: "center" }}>
            An error occured while trying to visualize your results.
          </h3>
          <h4>The error message below may be useful for troubleshooting: </h4>
          <p>{this.state.error}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

module.exports.ResultsPageErrorBoundary = ResultsPageErrorBoundary;
