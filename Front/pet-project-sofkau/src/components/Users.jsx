import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { HOST_API } from "../config/hostApi";
import UsuarioFrom from './usuario/usuarioFrom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import swal from 'sweetalert';

const Users = () => {
    const [loading, setLoading] = useState(true)
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("")

    const buscar = async (textoBusqueda) => {
        let resultado = await usuarios.filter((elemento) => {
            if (elemento.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
                || elemento.rol.toLowerCase().includes(textoBusqueda.toLowerCase())) {
                return elemento;
            }
        });
        setUsuarios(resultado);
    }

    const handleChange = event => {
        setBusqueda(event.target.value);
        buscar(event.target.value);
    }

    const validate = (idUsuario) => {
        swal({
            title: "¿Eliminar?",
            text: "¡Recuerda, al eliminar no podrás recuperar este dato!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((eliminar) => {
                if (eliminar) {
                    swal("¡Se ha eliminado con exito!", {
                        icon: "success",
                    });
                    eliminarUsuario(idUsuario)
                } else {
                    swal("uff, que bueno que preguntamos");
                }
            });
    }

    const onAdd = () => {
        location.href = "http://localhost:3000/addUsuario";
    };

    const onEdit = (id) => {
        location.href = "http://localhost:3000/editar/:" + id;
    };


    const eliminarUsuario = (idUsuario) => {
        console.log(idUsuario)
        axios.delete(HOST_API + "/usuario/" + idUsuario)
            .then(response => {
                console.log("Respuesta al eliminar-->" + response.data)
                cargarUsuarios();
            });

    }

    const cargarUsuarios = () => {
        setLoading(true)
        const usuarioEliminado = await axios.delete(HOST_API + "/usuario/" + idUsuario).then(response => {
            console.log("Respuesta al eliminar-->" + response.data)
            setLoading(false)
        });
        axios
            .get(HOST_API + "/usuario/listar/")
            .then((get) => {
                setUsuarios(get.data);
                console.log(get.data)
                setLoading(false)
            })
    }

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
                                {usuarios && usuarios.map((usuario, index) => (
                                    <tr key={usuario.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.ubicacion}</td>
                                        <td>{usuario.rol}</td>
                                        <td>{usuario.fechaIngreso}</td>
                                        <td>
                                            <button className="btn btn-warning m-3"
                                                onClick={() => onEdit(usuario)}>Editar</button>
                                            <button className="btn btn-danger"
                                                onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                                        </td>
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
