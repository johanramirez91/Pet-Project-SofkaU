import React from 'react';
import { FaGithub } from 'react-icons/fa';



const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white fixed-bottom">
            <div className="container p-2 pb-0">
                <section className="mb-3">
                    <a className="btn btn-light m-2" href="https://github.com/johanramirez91/Pet-Project-SofkaU" role="button" target="_blank"
                    ><FaGithub /></a>
                </section>
            </div>
            <div className="text-center p-3" style={{ color: "white" }}>
                © 2021 Copyright:
            </div>
        </footer>

    )
}

export default Footer
