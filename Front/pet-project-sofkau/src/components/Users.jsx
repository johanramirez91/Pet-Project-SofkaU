import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { HOST_API } from "../config/hostApi";
import UsuarioFrom from './usuario/usuarioFrom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Users = () => {
    const [loading, setLoading] = useState(true)
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("")
    //const { state: { usuario }, dispatch } = useContext(ContextoUsuario);

    const handleChange = event => {
        setBusqueda(event.target.value);
        buscar(event.target.value);
    }

    const buscar = async (textoBusqueda) => {
        let resultado = await usuarios.filter((elemento) => {
            if (elemento.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
                || elemento.rol.toLowerCase().includes(textoBusqueda.toLowerCase())) {
                return elemento;
            }
        });
        setUsuarios(resultado);
    }

    const onAdd = () => {
        location.href = "http://localhost:3000/addUsuario";
    };

    const onEdit = (id) => {
        location.href = "http://localhost:3000/editar/:"+id;
    };

    const onDelete = async (idUsuario) => {
        if (window.confirm('¿Está seguro de eliminar el usuario?')) {
            eliminarUsuarios(idUsuario);
            cargarUsuarios();
        }
    }

    const eliminarUsuarios = async (idUsuario) => {
        setLoading(true)
        const usuarioEliminado = await axios.delete(HOST_API + "/usuario/" + idUsuario).then(response => {
            console.log("Respuesta al eliminar-->" + response.data)
            setLoading(false)
        });

    }

    const cargarUsuarios = async () => {
        setLoading(true)
        const listaTemporal = await axios
            .get(HOST_API + "/usuario/listar/")
            .then((response) => {
                setUsuarios(response.data);
                console.log(response.data)
                setLoading(false)

            })
        setLoading(false)
    }

    useEffect(() => {
        cargarUsuarios()
    }, []);

    return (
        <Fragment>
            {
                loading
                    ?
                    <Loading />
                    :
                    <div>
                        <h3 className="text-center mt-3">Lista de Usuarios</h3>
                        <hr />
                        <form className="d-flex">
                            {<input className="form-control me-2" placeholder="Buscar"
                                value={busqueda} onChange={handleChange} />}
                            <button className="btn btn-outline-secondary" type="submit">Buscar</button>
                        </form>
                        <br />
                        <table className="table table-hover align-middle text-center table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Ubicación</th>
                                    <th scope="col">rol</th>
                                    <th scope="col">Ingreso</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario, index) => (
                                    <tr key={usuario.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.ubicacion}</td>
                                        <td>{usuario.rol}</td>
                                        <td>{usuario.fechaIngreso}</td>
                                        <td><button className="btn btn-primary" onClick={() => onAdd(usuario)}>Añadir</button></td>
                                        <td><button className="btn btn-success" onClick={() => onEdit(usuario)}>Editar</button></td>
                                        <td><button className="btn btn-danger" onClick={() => onDelete(usuario.id)}>Eliminar</button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </Fragment>
    )
}

export default Users;
