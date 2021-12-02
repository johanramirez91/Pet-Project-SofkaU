import React, { useContext, useRef, useState, useEffect } from 'react';
import { HOST_API } from '../../config/hostApi';
import ContextoUsuario from './contexto/ContextoUsuario';
import Select from 'react-select'
import axios from 'axios';
import { useParams } from 'react-router';

const UsuarioEditForm = () => {

    let { id } = useParams();

    const formRef = useRef(null);
    const { state: { usuario } } = useContext(ContextoUsuario);
    const item = usuario.item;
    const [state, setState] = useState(item);
    const options = [
        { value: 'ESTUDIANTE', label: 'ESTUDIANTE' },
        { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
        { value: 'PROFESOR', label: 'PROFESOR' }
    ]
    const [loading, setLoading] = useState(true)
    const [usuarios, setUsuarios] = useState([]);

    const cargarUsuario = async () => {
        setLoading(true)
        const listaTemporal = await axios
            .get(HOST_API + "/usuario/" + id)
            .then((response) => {
                setUsuarios(response.data);
                console.log(response.data)
                setLoading(false)

            })
        setLoading(false)
    }

    useEffect(() => {
        cargarUsuario()
    }, []);

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
            console.log("Retorno de editar-->" + response.data);
            formRef.current.reset();
        })
    }

    return (
        <form className="form-inline" ref={formRef}>
            <div className="shadow p-4 mb-2 bg-white rounded form-group mx-10">
                <Select
                    placeholder="Seleccione un rol"
                    name="rol"
                    options={options}
                    onChange={(event) => {
                        setState({ ...state, rol: event.value })
                    }} />
                <input
                    className="form-control"
                    type="text"
                    name="nombre"
                    placeholder="nombre"
                    defaultValue={usuarios.nombre}
                    onChange={(event) => {
                        setState({ ...state, nombre: event.target.value })
                    }}  ></input>
                <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="email"
                    defaultValue={usuarios.email}
                    onChange={(event) => {
                        setState({ ...state, email: event.target.value })
                    }}  ></input>
                <input
                    className="form-control"
                    type="text"
                    name="telefono"
                    placeholder="telefono"
                    defaultValue={usuarios.telefono}
                    onChange={(event) => {
                        setState({ ...state, telefono: event.target.value })
                    }}  ></input>
                <input
                    className="form-control"
                    type="text"
                    name="ubicacion"
                    placeholder="ubicacion"
                    defaultValue={usuarios.ubicacion}
                    onChange={(event) => {
                        setState({ ...state, ubicacion: event.target.value })
                    }}  ></input>
                <input
                    className="form-control"
                    type="date"
                    name="fechaIngreso"
                    placeholder="fechaIngreso"
                    defaultValue={usuarios.fechaIngreso}
                    onChange={(event) => {
                        setState({ ...state, fechaIngreso: event.target.value })
                    }}  ></input>
                <div className="m-4">
                    <button className="btn btn-primary btn-lg" onClick={onEdit}>Actualizar</button>
                </div>

            </div>
            <br></br>
        </form>
    );
}

export default UsuarioEditForm;