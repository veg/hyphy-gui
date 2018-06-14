import React from "react";
import ReactDOM from "react-dom";
import { TreeBtnGroup } from "TreeBtnGroup";

it("renders the TreeBtnGroup component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TreeBtnGroup />, div);
});
