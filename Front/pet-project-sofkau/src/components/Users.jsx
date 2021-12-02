import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { HOST_API } from "../config/hostApi";
import swal from 'sweetalert';
import { useAuth0 } from '@auth0/auth0-react';


const Users = () => {
    const [loading, setLoading] = useState(true)
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("")

    const buscar = (textoBusqueda) => {
        let resultado = usuarios.filter((elemento) => {
            if (elemento.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
                || elemento.rol.toLowerCase().includes(textoBusqueda.toLowerCase())
                || elemento.ubicacion.toLowerCase().includes(textoBusqueda.toLowerCase())
                || elemento.fechaIngreso.includes(textoBusqueda.toLowerCase())) {
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
        location.href = "http://localhost:3000/editarUsuario/" + id;
    };


    const eliminarUsuario = (idUsuario) => {
        console.log(idUsuario)
        axios.delete(HOST_API + "/usuario/" + idUsuario)
            .then(response => {
                console.log("Respuesta al eliminar-->" + response.data)
                cargarUsuarios();
            });

    }

    const cargarUsuarios = async () => {
        setLoading(true)
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
            {loading ? <Loading /> :
                <div className="container-fluid container-md">
                    <h2 className="text-center mt-3 p-1" style={{ color: '#fe5a59' }}>Lista de Usuarios</h2>
                    <hr />
                    <div className="position-relative p-4">
                        <button className="btn btn-dark position-absolute start-50 translate-middle"
                            onClick={onAdd}>Agregar usuario</button>
                    </div>
                    <div className="container-fluid p-3">
                        <form >
                            {<input className="form-control" placeholder="Buscar"
                                value={busqueda} onChange={handleChange} />}
                        </form>
                    </div>
                    <br />
                    <table className="table table-hover align-middle text-center table-responsive p-3">
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
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.ubicacion}</td>
                                    <td>{usuario.rol}</td>
                                    <td>{usuario.fechaIngreso}</td>
                                    <td>
                                        <button className="btn btn-warning m-3"
                                            onClick={() => onEdit(usuario.id)}>Editar</button>
                                        <button className="btn btn-danger"
                                            onClick={() => validate(usuario.id)}>Eliminar</button>
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
