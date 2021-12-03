import React, { useContext, useRef, useState, useEffect, Fragment } from 'react';
import { HOST_API } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

const UsuarioEditForm = () => {

    let { id } = useParams();
    let history = useNavigate();
    const formRef = useRef(null);
    const { state: { usuario } } = useContext(Contexto); //Traemos el contexto global
    const item = usuario.item;
    const [state, setState] = useState(item);
    const options = [
        { value: 'ESTUDIANTE', label: 'ESTUDIANTE' },
        { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
        { value: 'PROFESOR', label: 'PROFESOR' }
    ]
    const [loading, setLoading] = useState(true)

    const cargarUsuario = async () => { //Hacemos una peticion para traer el usuario por su ID
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

    const validate = (event) => { // Creamos una cuadro de confirmacion 
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
                        onEdit(event); //Cuando sea exitoso se ira al evento de editar
                        history("/usuarios", { replace: true });
                    });
                } else {
                    swal("uff, que bueno que preguntamos");
                    return;
                }
            });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = { //Inicializamos los datos del state en un objeto
            nombre: state.nombre,
            id: id,
            rol: state.rol,
            email: state.email,
            telefono: state.telefono,
            ubicacion: state.ubicacion,
            fechaIngreso: state.fechaIngreso
        };

        axios.put(HOST_API + "/usuario/" + id, request).then(response => { // se realiza la peticion put
            formRef.current.reset(); //Limpiamos los campos del formulario
        })
    }

    return (
        <Fragment>
            <div className="contaniner m-5">
                <form className="contaniner m-2" ref={formRef}>
                    <h1 className="text-center mt-1 p-1" style={{ color: '#fe5a59' }} >Editar usuario</h1>
                    <hr />
                    <div className="container-md shadow p-3 mb-3 bg-white rounded form-group mx-10">
                        <div className="mb-2">
                            <label className="form-label">Rol del usuario</label>
                            <Select
                                placeholder="Seleccione un rol"
                                name="rol"
                                options={options}
                                onChange={(event) => { //Con este evento se esta pendiente de los cambios que realice el usuario y los aplica al state
                                    setState({ ...state, rol: event.value })
                                }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nombre del usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombre"
                                placeholder={usuario.nombre}
                                defaultValue={state.nombre}
                                onChange={(event) => {
                                    setState({ ...state, nombre: event.target.value })
                                }}  ></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email del usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder={usuario.email}
                                defaultValue={state.email}
                                onChange={(event) => {
                                    setState({ ...state, email: event.target.value })
                                }}  ></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono del usuario</label>
                            <input
                                className="form-control"
                                type="number"
                                name="telefono"
                                placeholder={usuario.telefono}
                                defaultValue={state.telefono}
                                onChange={(event) => {
                                    setState({ ...state, telefono: event.target.value })
                                }}  ></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ubicación del usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="ubicacion"
                                placeholder={state.ubicacion}
                                defaultValue={state.ubicacion}
                                onChange={(event) => {
                                    setState({ ...state, ubicacion: event.target.value })
                                }}  ></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha de ingreso del usuario</label>
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
                <div className="m-2 position-relative">
                    <button className="btn btn-dark btn-lg mb-5 top-0 start-50 position-absolute translate-middle"
                        onClick={validate}>Actualizar</button>
                </div>
            </div>
        </Fragment>
    );
}

export default UsuarioEditForm;