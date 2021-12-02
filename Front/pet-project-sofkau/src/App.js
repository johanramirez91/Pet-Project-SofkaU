import React from "react";
import Users from "./components/Users";
import NavbarComp from "./components/NavbarComp";
import Login from "./components/Login";
import StoreFromProvider from "./components/usuario/contexto/StateUsuario";
import UsuarioFrom from "./components/usuario/usuarioFrom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsuarioEditForm from "./components/usuario/usuarioEditForm";
import Footer from "./components/Footer";

function App() {

  return (
    <Router>
      <StoreFromProvider>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/addUsuario" element={<UsuarioFrom />} />
          <Route path="/editar/:id" element={<UsuarioEditForm />} />
        </Routes>
        <Footer />
      </StoreFromProvider>
    </Router>
  );
}

export default App;
