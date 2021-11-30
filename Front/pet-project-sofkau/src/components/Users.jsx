import React, { Fragment, useEffect, useState } from 'react';

const Users = ({ usuarios }) => {
    return (
        <Fragment>
            <h3>Lista de usuarios</h3>
            {usuarios.map(usuario =>
                <div className="mb-2 border p-2" key={usuario.id}>
                    {usuario.nombre}
                </div>
            )}
        </Fragment>
    )
}

export default Users
