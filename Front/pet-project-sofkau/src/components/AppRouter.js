import React, { useState } from 'react'
import Users from './Users';
import Login from "./Login";
import UsuarioFrom from './usuario/usuarioFrom';
import UsuarioEditForm from './usuario/usuarioEditForm';
import CursoFrom from './curso/cursoFrom';
import CursoEditForm from './curso/cursoEditForm';
import Courses from './Courses';
import Loading from './Loading';
import { useAuth0 } from '@auth0/auth0-react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Routes,
} from 'react-router-dom';
import { NavbarComp } from './NavbarComp';

export default function AppRouter({ usuario }) {
    const { isAuthenticated, user, isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />
    }

    return user !== false ? (
        <Router>
            <NavbarComp usuario={user} />
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/usuarios' element={<Users />} />
                <Route exact path="/addUsuario" element={<UsuarioFrom />} />
                <Route exact path="/editarUsuario/:id" element={<UsuarioEditForm />} />
                <Route exact path="/cursos" element={<Courses />} />
                <Route exact path="/addCurso" element={<CursoFrom />} />
                <Route exact path="/editarCurso/:id" element={<CursoEditForm />} />
                <Route exact path="/"
                    render={() => { isAuthenticated ? <Redirect from="/" to="/usuarios" /> : <Redirect from="/" to="/" /> }} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    )
        :
        <Login />
}
