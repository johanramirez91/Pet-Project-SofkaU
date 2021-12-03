import React, { Fragment, useContext, useRef, useState } from 'react';
import { HOST_API_CURSO } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';
import swal from 'sweetalert';

const CursoFrom = () => {
  const formRef = useRef(null);
  const { state: { curso } } = useContext(Contexto);
  const item = curso.item;
  const [state, setState] = useState(item);
  const options = [
    { value: 'DISPONIBLE', label: 'DISPONIBLE' },
    { value: 'NO DISPONIBLE', label: 'NO DISPONIBLE' }
  ]

  const redireccionar = () => {
    window.history.back();
  }

  const validate = (event) => {
    swal({
      title: "¿Agregar?",
      text: "¡Se agregará este nuevo curso a la base de datos!",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
      .then((agregar) => {
        if (agregar) {
          swal("¡Se ha agregado con exito!", {
            icon: "success",
            button: true
          }).then((aceptar) => {
            onAdd(event);
          });

        } else {
          swal("uff, que bueno que preguntamos");
          return;
        }
      });
  }

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
      redireccionar();
    })
  }

  return (
    <Fragment>
      <div class="coontaniner m-5 ">
        <form className="coontaniner m-5" ref={formRef}>
          <h1 className="text-center mt-3 p-1" style={{ color: '#fe5a59' }} >AGREGAR CURSO</h1>
          <hr />
          <div className="shadow p-4 mb-2 bg-white rounded form-group mx-10">
            <div class="mb-3">
              <label class="form-label">Disponibilidad del curso</label>
              <Select
                placeholder="Seleccione la disponibilidad"
                name="disponibilidad"
                options={options}
                onChange={(event) => {
                  setState({ ...state, disponibilidad: event.value })
                }} />
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre del curso</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                placeholder="Nombre del curso"
                defaultValue={item.nombre}
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
                placeholder="Descripción del curso"
                defaultValue={item.descripcion}
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
                placeholder="Duración del curso"
                defaultValue={item.duracion}
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
                placeholder="Precio del curso"
                defaultValue={item.precio}
                onChange={(event) => {
                  setState({ ...state, precio: event.target.value })
                }}  ></input>
            </div>
          </div>
          <br></br>
        </form>
        <button className="btn btn-primary btn-lg mb-5" onClick={validate}>Agregar</button>
      </div>
    </Fragment>
  );
}

export default CursoFrom;