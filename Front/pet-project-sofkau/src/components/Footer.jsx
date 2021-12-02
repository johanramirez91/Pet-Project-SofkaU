import React from 'react'

const Footer = () => {
    return (
        <div class="container my-5">

            <footer className="text-center text-lg-start" style={{ color: "#fe5a59" }}>
                <div className="container d-flex justify-content-center py-5">
                    <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                        <i className="fab fa-facebook-f"></i>
                    </button>
                    <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                        <i className="fab fa-youtube"></i>
                    </button>
                    <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                        <i className="fab fa-instagram"></i>
                    </button>
                    <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                        <i className="fab fa-twitter"></i>
                    </button>
                </div>

                <div className="text-center text-white p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
            </footer>

        </div>
    )
}

export default Footer
