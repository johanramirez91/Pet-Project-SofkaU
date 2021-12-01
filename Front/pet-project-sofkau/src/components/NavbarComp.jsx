import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import LogoCourseWare from "./LogoCourseWare.png"

const NavbarComp = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-warning bg-gradient navbar-expand-lg">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <Link to="/Home">
                            <img src={LogoCourseWare} alt="logo" width="200" href="/Home" />
                        </Link>
                    </span>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarComp;
