import React from 'react';
import GoogleLogin from 'react-google-login';

const Login = () => {

    const responseGoogle = (response) => {
        console.log(response.profileObj);
    }

    return (
        <div className="shadow-sm p-3 rounded text-center col-md-4 offset-md-4 mt-5 ">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Iniciar Session</h3>

                        <div className="form-group p-3">
                            <label>Correo Electronico</label>
                            <input type="email" className="form-control" placeholder="Ingrese correo electronico" />
                        </div>

                        <div className="form-group  p-3">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" placeholder="Ingrese contraseña" />
                        </div>

                        <div className="form-group  p-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Recuerdame</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Iniciar</button>
                        <br></br>
                        <div className="form-group  p-3">
                            <GoogleLogin
                                clientId="438215108595-f7lfe4tomh8bbpm3n30kj6q0bonhp705.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;