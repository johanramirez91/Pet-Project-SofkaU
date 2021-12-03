import React, { Fragment, useEffect, useState } from 'react'
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
    useLocation,
    Navigate
} from 'react-router-dom';

<<<<<<< HEAD
export default function AppRouter({ usuario }) {
    const [isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState(null)

    return usuario !== false ? (
        <Router>
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/usuarios' element={<Users />} />
                <Route exact path="/addUsuario" element={<UsuarioFrom />} />
                <Route exact path="/editarUsuario/:id" element={<UsuarioEditForm />} />
                <Route exact path="/cursos" element={<Courses />} />
                <Route exact path="/addCurso" element={<CursoFrom />} />
                <Route exact path="/editarCurso/:id" element={<CursoEditForm />} />
                <Route exact path="/"
                    render={() => { return (usuario.email == "johan911019@gmail.com" ? <Redirect from="/" to="/usuarios" /> : <Redirect from="/" to="/" />) }} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
=======
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
>>>>>>> cbfc40069f53b6a376735e8d120fc585acb4d58a
    )
        :
        <Login />
}
