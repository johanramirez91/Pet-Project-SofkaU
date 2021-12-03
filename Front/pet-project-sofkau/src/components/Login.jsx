import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Icon from '../Icon.png'
import swal from 'sweetalert';

export default function Login() {

    let history = useNavigate();
    const { loginWithPopup } = useAuth0();
    const { isAuthenticated, user } = useAuth0();


    const authHandle = (userData) => {
        console.log(userData.profileObj)
        history("/usuarios", { replace: true })
    }

    const handleFailure = (failData) => {
        swal({
            title: "¡Upss!",
            text: "Intenta nuevamente",
            icon: "error",
            button: "ok",
        });
    }

    return (
        <div className="shadow p-3 rounded text-center col-md-4 offset-md-4 mt-5">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container  mt-3">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3 className="text-decoration-underline p-2 mb-2">Iniciar Sesión</h3>
                        <div className="p-3">
                            <img src={Icon} alt="logo" width="100" href="#" />
                        </div>
                        <button type="submit" className="btn btn-dark btn-block btn-lg"
                            onClick={() => loginWithPopup()}>¡Vamos!</button>
                        <br></br>
                        <div className="form-group p-3">
                            <GoogleLogin
                                clientId="438215108595-f7lfe4tomh8bbpm3n30kj6q0bonhp705.apps.googleusercontent.com"
                                buttonText="Iniciar con Google"
                                onSuccess={authHandle}
                                onFailure={handleFailure}
                                isSignedIn={true}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

