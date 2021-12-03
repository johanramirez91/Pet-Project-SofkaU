import React, { Fragment } from 'react'
import LogoCourseWare from "./LogoCourseWare.png"
import { useAuth0 } from '@auth0/auth0-react';
import LogOut from './Logout';
import { Link } from 'react-router-dom'

export const NavbarComp = ({ usuario }) => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark bg-gradient navbar-expand-lg">
                <div className="container-fluid">
                    <span className="navbar-brand p-2">
                        <a href="">
                            <img src={LogoCourseWare} alt="logo" width="140" to="/" />
                        </a>
                    </span>
                    <div className="d-grid gap-2 d-md-block d-md-flex">
                        {isAuthenticated ? (
                            <Fragment>
                                <Link className="btn btn-secondary bg-gradient" data-bs-toggle="button" to="/cursos" exact >Lista Cursos</Link>
                                <Link className="btn btn-secondary bg-gradient" data-bs-toggle="button" to="/usuarios" exact >Lista Usuarios</Link>
                                <Link className="btn btn-danger bg-gradient" data-bs-toggle="button" to="/" exact >Salir</Link>
                            </Fragment>
                        ) : (<div className="d-grid gap-2 d-md-block d-md-flex">
                        </div>)}

                    </div>
                </div>
            </nav>
        </Fragment>
    )
}
