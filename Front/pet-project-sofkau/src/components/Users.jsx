import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { HOST_API } from "../config/hostApi";

const Users = () => {

    const [loading, setLoading] = useState(true)
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios
            .get(HOST_API + "/usuario/listar/")
            .then((response) => {
                setUsuarios(response.data);
                console.log(response.data)
                setLoading(false)
            })
    }, []);

    return (
        <Fragment>
            {
                loading
                    ?
                    <Loading />
                    :
                    <div>
                        {usuarios.map(usuario =>
                            <div className="d-flex justify-content-center mb-2 mt-2">
                                <div className="mb-3 border rounded p-2 text-center" key={usuario.id}>
                                    {usuario.nombre}
                                </div>
                            </div>
                        )}
                    </div>
            }
        </Fragment>
    )
}

export default Users;
