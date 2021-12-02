import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-center bg-gradient text-white fixed-bottom mt-3">
            <div className="container p-2 pb-0">
                <section className="mb-3">
                    <a className="btn btn-light m-2" href="https://github.com/johanramirez91/Pet-Project-SofkaU" role="button" target="_blank"
                    ><FaGithub /></a>
                </section>
            </div>
            <div className="text-center p-3" style={{ color: "white" }}>
                © 2021 Copyright: David Zuluaga, Johan Ramirez.
            </div>
        </footer>

    )
}

export default Footer
