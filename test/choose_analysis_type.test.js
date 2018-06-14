import React from "react";
import ReactDOM from "react-dom";
import { ChooseAnalysisType } from "ChooseAnalysisType";

function mockUpdateJobInfo(key, value) {
  return key, value;
}

it("renders the ChooseAnalysisType component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ChooseAnalysisType updateJobInfo={mockUpdateJobInfo} />,
    div
  );
});
