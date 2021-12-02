import React, { useContext, useRef, useState, useEffect } from 'react';
import { HOST_API_CURSO } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';
import { useParams } from 'react-router';

const CursoEditForm = () => {

    let { id } = useParams();

    const formRef = useRef(null);
    const { state: { curso } } = useContext(Contexto);
    const item = curso.item;
    const [state, setState] = useState(item);
    const options = [
        { value: 'DISPONIBLE', label: 'DISPONIBLE' },
        { value: 'NO DISPONIBLE', label: 'NO DISPONIBLE' }
    ]
    const [loading, setLoading] = useState(true)

    const cargarCurso = async () => {
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

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            id: id,
            nombre: state.nombre,
            descripcion: state.descripcion,
            disponibilidad: state.disponibilidad,
            duracion: state.duracion,
            precio: state.precio
        };

        axios.put(HOST_API_CURSO + "/" + id, request).then(response => {
            console.log("Retorno de editar-->" + response.data);
            formRef.current.reset();
        })
    }

    return (
        <form className="form-inline" ref={formRef}>
            <div className="shadow p-4 mb-2 bg-white rounded form-group mx-10">
                <Select
                    placeholder="Seleccione la disponibilidad"
                    name="disponibilidad"
                    options={options}
                    onChange={(event) => {
                        setState({ ...state, disponibilidad: event.value })
                    }} />
                <input
                    className="form-control"
                    type="text"
                    name="nombre"
                    placeholder="nombre"
                    defaultValue={state.nombre}
                    onChange={(event) => {
                        setState({ ...state, nombre: event.target.value })
                    }}  ></input>
                <textarea
                    className="form-control"
                    type="text"
                    name="descripcion"
                    placeholder="descripcion"
                    defaultValue={state.descripcion}
                    onChange={(event) => {
                        setState({ ...state, descripcion: event.target.value })
                    }} />
                <input
                    className="form-control"
                    type="text"
                    name="duracion"
                    placeholder="duracion"
                    defaultValue={state.duracion}
                    onChange={(event) => {
                        setState({ ...state, duracion: event.target.value })
                    }}  ></input>
                <input
                    className="form-control"
                    type="text"
                    name="precio"
                    placeholder="precio"
                    defaultValue={state.precio}
                    onChange={(event) => {
                        setState({ ...state, precio: event.target.value })
                    }}  ></input>
                <div className="m-4">
                    <button className="btn btn-primary btn-lg" onClick={onEdit}>Actualizar</button>
                </div>

            </div>
            <br></br>
        </form>
    );
}

export default CursoEditForm;