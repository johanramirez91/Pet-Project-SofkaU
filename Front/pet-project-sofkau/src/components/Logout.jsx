import React from 'react'
import { GoogleLogout } from 'react-google-login';

const clientId = "438215108595-f7lfe4tomh8bbpm3n30kj6q0bonhp705.apps.googleusercontent.com"

function Logout() {

    const onSucces = () => {
        console.log("Logout done")
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Salir"
                onLogoutSuccess={onSucces}
                redi
            />
        </div>
    )
}

export default Logout;
