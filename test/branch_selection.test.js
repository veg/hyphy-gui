import React from "react";
import ReactDOM from "react-dom";
import { BranchSelection } from "BranchSelection";

it("renders the BranchSelection component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BranchSelection />, div);
});
