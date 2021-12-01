import React, { Fragment } from "react";
import Users from "./components/Users";
import NavbarComp from "./components/NavbarComp";
import Login from "./components/Login";

function App() {

  return (
    <Fragment>
      <NavbarComp />
      <Users />
      <div>
        <Login />
      </div>
    </Fragment>
  );
}

export default App;
