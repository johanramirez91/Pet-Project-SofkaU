import React, { Fragment } from 'react'
import LogoCourseWare from "./LogoCourseWare.png"
import { GoogleLogout, useGoogleLogout } from 'react-google-login';
import { useAuth0 } from '@auth0/auth0-react';
import LogOut from './Logout';


const NavbarComp = () => {
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
                            <LogOut />
                        ) : (<div className="d-grid gap-2 d-md-block d-md-flex">
                        </div>)}

                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarComp;
