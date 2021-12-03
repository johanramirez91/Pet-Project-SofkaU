import React, { Fragment } from 'react'
import LogoCourseWare from "./LogoCourseWare.png"
import { Link } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login';

const NavbarComp = ({ usuario }) => {

    const handleLogOut = () => {
        console.log("usuario salió")
    }

    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark bg-gradient navbar-expand-lg">
                <div className="container-fluid">
                    <span className="navbar-brand p-3">
                        <img src={LogoCourseWare} alt="logo" width="150" href="#" />
                    </span>
                    <div className="d-grid gap-2 d-md-block d-md-flex">
                        {!!usuario && <Link className="btn btn-primary bg-gradient" data-bs-toggle="button" to="/usuarios" exact >Maestro usuarios</Link>}
                        {!!usuario && <Link className="btn btn-primary bg-gradient" data-bs-toggle="button" to="/cursos" >Lista de Cursos</Link>}
                        <div className="vr"></div>
                        {!!usuario && <GoogleLogout
                            clientId="438215108595-f7lfe4tomh8bbpm3n30kj6q0bonhp705.apps.googleusercontent.com"
                            buttonText="Salir"
                            onLogoutSuccess={handleLogOut}
                        />}
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarComp;
