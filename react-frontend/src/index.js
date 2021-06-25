import React from "react";
import ReactDOM from "react-dom";

import Navbar from "./Navbar";
import Main from "./Main";

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
