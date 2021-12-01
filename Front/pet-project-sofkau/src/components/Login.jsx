import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Estados Error
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        let mensajeError = "";

        // Validaciones input iniciar sesión
        if (!email.trim()) {
            setErrorEmail("Ingresa un email valido")
            return
        }

        if (password.trim()) {
            setErrorEmail("Ingresa una contraseña valida")
            return
        }

        // Validaciones Firebase
        if (password.length < 6) {
            console.error('Ingresa una constraseña mayor a 6 caracteres')
            setErrorPassword('Ingresa una contraseña mayor a 6 caracteres')
            return
        }

        setEmail('')
        setPassword('')
        setErrorEmail(null)
        setErrorPassword(null)
    }

    const responseGoogle = (response) => {
        console.log(response.profileObj);
    }

    return (
        <div className="shadow p-3 rounded text-center col-md-4 offset-md-4 mt-5 ">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>

                        <h3 className="text-decoration-underline p-2">Iniciar Sesión</h3>

                        <div className="form-group p-3">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                className={`form-control mb-2 ` + (errorEmail ? 'is-invalid' : '')}
                                placeholder="Ingresa tu email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            {
                                errorEmail ?
                                    (
                                        <div className="invalid-feedback mb-2">
                                            {errorEmail}
                                        </div>
                                    )
                                    : null
                            }
                        </div>

                        <div className="form-group  p-3">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                className={`form-control mb-2 ` + (errorPassword ? 'is-invalid' : '')}
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {
                                errorPassword ?
                                    (
                                        <div className="invalid-feedback mb-2">
                                            {errorPassword}
                                        </div>
                                    )
                                    : null
                            }
                        </div>

                        <div className="form-group  p-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label m-2" htmlFor="customCheck1">Recuerdame</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark btn-block">¡Vamos!</button>
                        <br></br>
                        <div className="form-group p-3">
                            <GoogleLogin
                                clientId="438215108595-f7lfe4tomh8bbpm3n30kj6q0bonhp705.apps.googleusercontent.com"
                                buttonText="Iniciar con Google"
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