import React from "react";
import ReactDOM from "react-dom";
import { ChooseGeneticCode } from "ChooseGeneticCode";

it("renders the ChooseGeneticCode component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChooseGeneticCode />, div);
});
