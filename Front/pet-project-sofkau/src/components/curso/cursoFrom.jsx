import React, { useContext, useRef, useState } from 'react';
import { HOST_API_CURSO } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';

const CursoFrom = () => {
  const formRef = useRef(null);
  const { state: { curso } } = useContext(Contexto);
  const item = curso.item;
  const [state, setState] = useState(item);
  const options = [
    { value: 'DISPONIBLE', label: 'DISPONIBLE' },
    { value: 'NO DISPONIBLE', label: 'NO DISPONIBLE' }
  ]

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      id: null,
      nombre: state.nombre,
      descripcion: state.descripcion,
      disponibilidad: state.disponibilidad,
      duracion: state.duracion,
      precio: state.precio
    };

    axios.post(HOST_API_CURSO + "/add", request).then(response => {
      console.log("Retorno de añadir-->" + response.data);
      formRef.current.reset();
    })

  }

  return (
    <form className="form-inline" ref={formRef}>
      <div className="container-md shadow p-4 mb-2 bg-white rounded form-group mx-10">
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
          defaultValue={item.nombre}
          onChange={(event) => {
            setState({ ...state, nombre: event.target.value })
          }}  ></input>
        <textarea
          className="form-control"
          type="text"
          name="descripcion"
          placeholder="descripcion"
          defaultValue={item.descripcion}
          onChange={(event) => {
            setState({ ...state, descripcion: event.target.value })
          }}  />
        <input
          className="form-control"
          type="text"
          name="duracion"
          placeholder="duracion"
          defaultValue={item.duracion}
          onChange={(event) => {
            setState({ ...state, duracion: event.target.value })
          }}  ></input>
        <input
          className="form-control"
          type="text"
          name="precio"
          placeholder="precio"
          defaultValue={item.precio}
          onChange={(event) => {
            setState({ ...state, precio: event.target.value })
          }}  ></input>
        <div className="m-4">
          <button className="btn btn-primary btn-lg" onClick={onAdd}>Crear</button>
        </div>

      </div>
      <br></br>
    </form>
  );
}

export default CursoFrom;