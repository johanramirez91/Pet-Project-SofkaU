import React, { Fragment } from "react";
import Users from "./components/Users";
import NavbarComp from "./components/NavbarComp";
import Login from "./components/Login";

function App() {

  return (
    <Fragment>
      <NavbarComp />
      <h3 className="text-center mt-3">Lista de Usuarios</h3>
      <Users />
      <div>
        <Login />
      </div>
    </Fragment>
  );
}

export default App;
