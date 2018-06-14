import React from "react";
import ReactDOM from "react-dom";
import { AdvancedFubarOptions } from "AdvancedFubarOptions";

function mockUpdateJobInfo(key, value) {
  return key, value;
}

it("renders the AdvancedFubarOptions component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AdvancedFubarOptions updateJobInfo={mockUpdateJobInfo} />,
    div
  );
});
