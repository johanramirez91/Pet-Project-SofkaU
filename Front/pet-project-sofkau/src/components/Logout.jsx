import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';

function LogOut() {

    const onLogoutSucces = (response) => {
        console.log("loggedOut");
        let history = useNavigate();
        history("/", { replace: true })
    }

    const onFailure = () => {
        console.log("Fallo logout")
    }

    const { signOut } = useGoogleLogout({
        clientId: "438215108595-f7lfe4tomh8bbpm3n30kj6q0bonhp705.apps.googleusercontent.com",
        onLogoutSucces,
        onFailure,
    })

    return (
        <button onClick={() => signOut} className="btn btn-danger">
            Salir
        </button>
    )
}

export default LogOut;