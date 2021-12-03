import React, { Fragment } from 'react'
import Users from './Users';
import Login from "./Login";
import UsuarioFrom from './usuario/usuarioFrom';
import UsuarioEditForm from './usuario/usuarioEditForm';
import CursoFrom from './curso/cursoFrom';
import CursoEditForm from './curso/cursoEditForm';
import Courses from './Courses';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Routes,
} from 'react-router-dom';

const AppRouter = () => {
    return (
        <Fragment>
            <div className="p-5">
                <Router>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path="/usuarios" element={<Users />} />
                    <Route exact path="/addUsuario" element={<UsuarioFrom />} />
                    <Route exact path="/editarUsuario/:id" element={<UsuarioEditForm />} />
                    <Route exact path="/cursos" element={<Courses />} />
                    <Route exact path="/addCurso" element={<CursoFrom />} />
                    <Route exact path="/editarCurso/:id" element={<CursoEditForm />} />
                </Routes>
            </Router>
            </div>
            
        </Fragment>
    )
}

export default AppRouter
