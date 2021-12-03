import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {

    const { Logout } = useAuth0();

    return (
        <button className="btn btn-danger"
            onClick={() => Logout({ returnTo: "/" })}>Salir</button>
    )
}

export default Logout
