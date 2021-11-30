import React, { Fragment } from 'react';

const Users = ({ usuarios }) => {
    return (
        <Fragment>
            {usuarios.map(usuario =>
                <div className="mb-3 border p-2 text-center" key={usuario.id}>
                    {usuario.nombre}
                </div>
            )}
        </Fragment>
    )
}

export default Users;
