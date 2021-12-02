import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { HOST_API_CURSO } from "../config/hostApi";
import swal from 'sweetalert';


const Courses = () => {
    const [loading, setLoading] = useState(true)
    const [cursos, setCursos] = useState([]);
    const [busqueda, setBusqueda] = useState("")

    const buscar = (textoBusqueda) => {
        let resultado = cursos.filter((elemento) => {
            if (elemento.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
                || elemento.disponibilidad.toLowerCase().includes(textoBusqueda.toLowerCase())
                || elemento.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())) {
                return elemento;
            }
        });
        setCursos(resultado);
    }

    const handleChange = event => {
        setBusqueda(event.target.value);
        buscar(event.target.value);
    }

    const validate = (idCurso) => {
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
                    eliminarUsuario(idCurso)
                } else {
                    swal("uff, que bueno que preguntamos");
                }
            });
    }

    const onAdd = () => {
        location.href = "http://localhost:3000/addCurso";
    };

    const onEdit = (id) => {
        location.href = "http://localhost:3000/editarCurso/" + id;
    };


    const eliminarUsuario = (idCurso) => {
        console.log(idCurso)
        axios.delete(HOST_API_CURSO + "/" + idCurso)
            .then(response => {
                console.log("Respuesta al eliminar-->" + response.data)
                cargarUsuarios();
            });

    }

    const cargarUsuarios = async () => {
        setLoading(true)
        axios
            .get(HOST_API_CURSO + "/listar")
            .then((get) => {
                setCursos(get.data);
                console.log(get.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        axios
            .get(HOST_API_CURSO + "/listar/")
            .then((response) => {
                setCursos(response.data);
                console.log(response.data)
                setLoading(false)
            })
    }, []);

    return (
        <Fragment>
            {loading ? <Loading /> :
                <div className="container-fluid container-md">
                    <h2 className="text-center mt-3 p-1" style={{ color: '#fe5a59' }}>Lista de Cursos</h2>
                    <hr />
                    <div className="d-flex">
                        <form >
                            {<input className="form-control m-3" placeholder="Buscar"
                                value={busqueda} onChange={handleChange} />}
                        </form>
                        <button className="btn btn-primary m-3"
                            onClick={onAdd}>Agregar curso</button>
                    </div>
                    <br />
                    <table className="table table-hover align-middle text-center table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Duracion</th>
                                <th scope="col">Disponibilidad</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursos && cursos.map((curso, index) => (
                                <tr key={curso.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{curso.nombre}</td>
                                    <td>{curso.descripcion}</td>
                                    <td>{curso.duracion}</td>
                                    <td>{curso.disponibilidad}</td>
                                    <td>$ {curso.precio}</td>
                                    <td>
                                        <button className="btn btn-warning m-3"
                                            onClick={() => onEdit(curso.id)}>Editar</button>
                                        <button className="btn btn-danger"
                                            onClick={() => validate(curso.id)}>Eliminar</button>
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

export default Courses;
