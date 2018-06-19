import React from "react";
import ReactDOM from "react-dom";
import { GetMSAPath } from "GetMSAPath";

it("renders the GetMSAPath component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GetMSAPath />, div);
});
