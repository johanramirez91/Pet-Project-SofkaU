import React, { Fragment } from 'react'
import LogoCourseWare from "./LogoCourseWare.png"
import { GoogleLogout } from 'react-google-login';
import Logout from './Logout';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';


const NavbarComp = ({ usuario }) => {
    const { isAuthenticated, user } = useAuth0();

    const logout = (userData) => {
        console.log(userData)
    }

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
                            <GoogleLogout
                                clientId="438215108595-f7lfe4tomh8bbpm3n30kj6q0bonhp705.apps.googleusercontent.com"
                                buttonText="Logout Google"
                                onLogoutSuccess={logout} />
                        ) : (<div className="d-grid gap-2 d-md-block d-md-flex">
                            hola
                        </div>)}

                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarComp;
