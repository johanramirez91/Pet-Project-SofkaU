import React, { Fragment } from "react";
import Users from "./components/Users";
import NavbarComp from "./components/NavbarComp";
import Login from "./components/Login";
import StoreFromProvider from "./components/usuario/contexto/StateUsuario";
import UsuarioFrom from "./components/usuario/usuarioFrom";

function App() {

  return (
    <Fragment>
      <StoreFromProvider>
        <NavbarComp />
        <Users />
        <div>
          <Login />
        </div>
        
        <UsuarioFrom/>
      </StoreFromProvider>
    </Fragment>
  );
}

export default App;
