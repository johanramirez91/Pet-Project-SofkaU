import React, { useContext, useRef, useState, useEffect, Fragment } from 'react';
import { HOST_API } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';
import { useParams } from 'react-router';
import swal from 'sweetalert';

const UsuarioEditForm = () => {

    let { id } = useParams();

    const formRef = useRef(null);
    const { state: { usuario } } = useContext(Contexto);
    const item = usuario.item;
    const [state, setState] = useState(item);
    const options = [
        { value: 'ESTUDIANTE', label: 'ESTUDIANTE' },
        { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
        { value: 'PROFESOR', label: 'PROFESOR' }
    ]
    const [loading, setLoading] = useState(true)

    const cargarUsuario = async () => {
        setLoading(true)
        const listaTemporal = await axios
            .get(HOST_API + "/usuario/" + id)
            .then((response) => {
                setState(response.data);
                console.log(response.data)
                setLoading(false)

            })
        setLoading(false)
    }

    useEffect(() => {
        cargarUsuario()
    }, []);


    const redireccionar = () => {
        window.history.back();
    }

    const validate = (event) => {
        swal({
            title: "¿Acutalizar?",
            text: "¡Se ¿Acutalizará este usuario en la base de datos!",
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then((editar) => {
                if (editar) {
                    swal("¡Se ha actualizado con exito!", {
                        icon: "success",
                        button: true
                    }).then((aceptar) => {
                        onEdit(event);
                    });

                } else {
                    swal("uff, que bueno que preguntamos");
                    return;
                }
            });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            nombre: state.nombre,
            id: id,
            rol: state.rol,
            email: state.email,
            telefono: state.telefono,
            ubicacion: state.ubicacion,
            fechaIngreso: state.fechaIngreso
        };

        axios.put(HOST_API + "/usuario/" + id, request).then(response => {
            redireccionar();
            formRef.current.reset();
        })
    }

    return (
        <Fragment>
            <div class="coontaniner m-5 ">
                <form className="coontaniner m-5" ref={formRef}>
                    <h1 className="text-center mt-3 p-1" style={{ color: '#fe5a59' }} >AGREGAR NUEVO CURSO</h1>
                    <hr />
                    <div className="container-md shadow p-4 mb-2 bg-white rounded form-group mx-10">
                        <div class="mb-3">
                            <label class="form-label">Rol del usuario</label>
                            <Select
                                placeholder="Seleccione un rol"
                                name="rol"
                                options={options}
                                onChange={(event) => {
                                    setState({ ...state, rol: event.value })
                                }} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nombre del usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombre"
                                placeholder="nombre"
                                defaultValue={state.nombre}
                                onChange={(event) => {
                                    setState({ ...state, nombre: event.target.value })
                                }}  ></input>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email del usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="email"
                                defaultValue={state.email}
                                onChange={(event) => {
                                    setState({ ...state, email: event.target.value })
                                }}  ></input>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Telefono del usuario</label>
                            <input
                                className="form-control"
                                type="number"
                                name="telefono"
                                placeholder="telefono"
                                defaultValue={state.telefono}
                                onChange={(event) => {
                                    setState({ ...state, telefono: event.target.value })
                                }}  ></input>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ubicación del usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="ubicacion"
                                placeholder="ubicacion"
                                defaultValue={state.ubicacion}
                                onChange={(event) => {
                                    setState({ ...state, ubicacion: event.target.value })
                                }}  ></input>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Fecha de ingreso del usuario</label>
                            <input
                                className="form-control"
                                type="date"
                                name="fechaIngreso"
                                placeholder="fechaIngreso"
                                defaultValue={state.fechaIngreso}
                                onChange={(event) => {
                                    setState({ ...state, fechaIngreso: event.target.value })
                                }}  ></input>
                        </div>
                    </div>
                    <br></br>
                </form>
                <div className="m-4">
                    <button className="btn btn-primary btn-lg mb-5" onClick={validate}>Actualizar</button>
                </div>
            </div>
        </Fragment>
    );
}

export default UsuarioEditForm;