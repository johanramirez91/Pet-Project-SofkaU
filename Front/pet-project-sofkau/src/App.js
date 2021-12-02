import React from "react";
import Users from "./components/Users";
import NavbarComp from "./components/NavbarComp";
import Login from "./components/Login";
import StoreFromProvider from "./components/contexto/State";
import UsuarioFrom from "./components/usuario/usuarioFrom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsuarioEditForm from "./components/usuario/usuarioEditForm";
import CursoFrom from "./components/curso/cursoFrom";
import CursoEditForm from "./components/curso/cursoEditForm";
import Courses from "./components/Courses";

function App() {

  return (
    <Router>
      <StoreFromProvider>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/addUsuario" element={<UsuarioFrom />} />
          <Route path="/editarUsuario/:id" element={<UsuarioEditForm />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/addCurso" element={<CursoFrom/>} />
          <Route path="/editarCurso/:id" element={<CursoEditForm />} />
        </Routes>
      </StoreFromProvider>
    </Router>
  );
}

export default App;
