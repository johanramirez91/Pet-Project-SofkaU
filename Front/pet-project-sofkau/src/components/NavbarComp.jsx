import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import LogoCourseWare from "./LogoCourseWare.png"

const NavbarComp = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark bg-gradient navbar-expand-lg">
                <div className="container-fluid">
                    <span className="navbar-brand p-3">
                        <img src={LogoCourseWare} alt="logo" width="150" href="/Home" />
                    </span>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarComp;
