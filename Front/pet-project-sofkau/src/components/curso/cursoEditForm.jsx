import React, { useContext, useRef, useState, useEffect, Fragment } from 'react';
import { HOST_API_CURSO } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';
import { useParams } from 'react-router';
import swal from 'sweetalert';

const CursoEditForm = () => {

    let { id } = useParams();

    const formRef = useRef(null);
    const { state: { curso } } = useContext(Contexto); //Traemos el contexto global
    const item = curso.item;
    const [state, setState] = useState(item);
    const options = [
        { value: 'DISPONIBLE', label: 'DISPONIBLE' },
        { value: 'NO DISPONIBLE', label: 'NO DISPONIBLE' }
    ]
    const [loading, setLoading] = useState(true)

    const cargarCurso = async () => { //Hacemos una peticion para traer el curso por su ID
        setLoading(true)
        const listaTemporal = await axios
            .get(HOST_API_CURSO + "/" + id)
            .then((response) => {
                setState(response.data);
                console.log(response.data)
                setLoading(false)

            })
        setLoading(false)
    }

    useEffect(() => {
        cargarCurso()
    }, []);


    const redireccionar = () => {
        window.history.back();
    }

    const validate = (event) => { // Creamos una cuadro de confirmacion 
        swal({
            title: "¿Acutalizar?",
            text: "¡Se ¿Acutalizará este curso en la base de datos!",
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
            id: id,
            nombre: state.nombre,
            descripcion: state.descripcion,
            disponibilidad: state.disponibilidad,
            duracion: state.duracion,
            precio: state.precio
        };

        axios.put(HOST_API_CURSO + "/" + id, request).then(response => { // se realiza la peticion put
            redireccionar();// se redirecciona a la pagina anterior cuando el servidor nos responda
            formRef.current.reset(); //Limpiamos los campos del formulario
        })
    }

    return (// Retornamos un formulario formulario
        <Fragment>
            <div class="coontaniner m-5 ">
                <form className="coontaniner m-5" ref={formRef}>
                    <h1 className="text-center mt-3 p-1" style={{ color: '#fe5a59' }} >EDITAR CURSO</h1>
                    <hr />
                    <div className="shadow p-4 mb-2 bg-white rounded form-group mx-10">
                        <div class="mb-3">
                            <label class="form-label">Disponibilidad del curso</label>
                            <Select
                                placeholder="Seleccione la disponibilidad"
                                name="disponibilidad"
                                options={options}
                                onChange={(event) => { //Con este evento se esta pendiente de los cambios que realice el usuario y los aplica al state
                                    setState({ ...state, disponibilidad: event.value })
                                }} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nombre del curso</label>
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
                            <label class="form-label">Descripción del curso</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="descripcion"
                                placeholder="descripcion"
                                defaultValue={state.descripcion}
                                onChange={(event) => {
                                    setState({ ...state, descripcion: event.target.value })
                                }} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Duración del curso</label>
                            <input
                                className="form-control"
                                type="number"
                                name="duracion"
                                placeholder="duracion"
                                defaultValue={state.duracion}
                                onChange={(event) => {
                                    setState({ ...state, duracion: event.target.value })
                                }}  ></input>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Precio del curso</label>
                            <input
                                className="form-control"
                                type="number"
                                name="precio"
                                placeholder="precio"
                                defaultValue={state.precio}
                                onChange={(event) => {
                                    setState({ ...state, precio: event.target.value })
                                }}  ></input>
                        </div>
                    </div>
                    <br></br>
                </form>
                <button className="btn btn-primary btn-lg mb-5 " onClick={validate}>Actualizar</button>
            </div>
        </Fragment>

    );
}

export default CursoEditForm;