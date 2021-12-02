import React, { useContext, useRef, useState } from 'react';
import { HOST_API } from '../../config/hostApi';
import ContextoUsuario from './contexto/ContextoUsuario';
import Select from 'react-select'
import axios from 'axios';

const UsuarioFrom = () => {
  const formRef = useRef(null);
  const { state: { usuario }, dispatch } = useContext(ContextoUsuario);
  const item = usuario.item;
  const [state, setState] = useState(item);
  const options = [
    { value: 'ESTUDIANTE', label: 'ESTUDIANTE' },
    { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
    { value: 'PROFESOR', label: 'PROFESOR' }
  ]

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      nombre: state.nombre,
      id: null,
      rol: state.rol,
      email: state.email,
      telefono: state.telefono,
      ubicacion: state.ubicacion,
      fechaIngreso: state.fechaIngreso
    };

    axios.post(HOST_API + "/usuario/add", request).then(response => {
      console.log("Retorno de añadir-->" + response.data);
      formRef.current.reset();
    })

  }

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      nombre: state.nombre,
      id: state.id,
      rol: state.rol,
      email: state.email,
      telefono: state.telefono,
      ubicacion: state.ubicacion,
      fechaIngreso: state.fechaIngreso
    };

    axios.put(HOST_API + "/usuario/" + state.id, request).then(response => {
      console.log("Retorno de editar-->" + response.data);
      formRef.current.reset();
    })
  }

  return (
    <form className="form-inline" ref={formRef}>
      <div className="container-md shadow p-4 mb-2 bg-white rounded form-group mx-10">
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
          defaultValue={item.nombre}
          onChange={(event) => {
            setState({ ...state, nombre: event.target.value })
          }}  ></input>
        <input
          className="form-control"
          type="text"
          name="email"
          placeholder="email"
          defaultValue={item.email}
          onChange={(event) => {
            setState({ ...state, email: event.target.value })
          }}  ></input>
        <input
          className="form-control"
          type="text"
          name="telefono"
          placeholder="telefono"
          defaultValue={item.telefono}
          onChange={(event) => {
            setState({ ...state, telefono: event.target.value })
          }}  ></input>
        <input
          className="form-control"
          type="text"
          name="ubicacion"
          placeholder="ubicacion"
          defaultValue={item.ubicacion}
          onChange={(event) => {
            setState({ ...state, ubicacion: event.target.value })
          }}  ></input>
        <input
          className="form-control"
          type="date"
          name="fechaIngreso"
          placeholder="fechaIngreso"
          defaultValue={item.fechaIngreso}
          onChange={(event) => {
            setState({ ...state, fechaIngreso: event.target.value })
          }}  ></input>
        <div className="m-4">
          {item.id && <button className="btn btn-primary btn-md" onClick={onEdit}>Actualizar</button>}
          {!item.id && <button className="btn btn-primary btn-md" onClick={onAdd}>Crear</button>}
        </div>

      </div>
      <br></br>
    </form>
  );
}

export default UsuarioFrom;