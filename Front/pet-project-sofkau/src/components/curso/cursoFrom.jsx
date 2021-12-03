import React, { Fragment, useContext, useRef, useState } from 'react';
import { HOST_API_CURSO } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';
import swal from 'sweetalert';

const CursoFrom = () => {
  const formRef = useRef(null);
  const { state: { curso } } = useContext(Contexto); //Traemos el contexto global
  const item = curso.item;
  const [state, setState] = useState(item);
  const options = [
    { value: 'DISPONIBLE', label: 'DISPONIBLE' },
    { value: 'NO DISPONIBLE', label: 'NO DISPONIBLE' }
  ]

  const redireccionar = () => {
    window.history.back();
  }

  const validate = (event) => { // Creamos una cuadro de confirmacion 
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
            onAdd(event); //Cuando sea exitoso se ira al evento de agregar
          });

        } else {
          swal("uff, que bueno que preguntamos");
          return;
        }
      });
  }

  const onAdd = (event) => {
    event.preventDefault();

    const request = { //Inicializamos los datos tomados en el state en un objeto
      id: null,
      nombre: state.nombre,
      descripcion: state.descripcion,
      disponibilidad: state.disponibilidad,
      duracion: state.duracion,
      precio: state.precio
    };

    axios.post(HOST_API_CURSO + "/add", request).then(response => { // se realiza la peticion pos
      console.log("Retorno de añadir-->" + response.data);
      redireccionar();// se redirecciona a la pagina anterior cuando el servidor nos responda
      formRef.current.reset(); //Limpiamos los campos
    })
  }

  return (// Retornamos un formulario formulario
    <Fragment>
      <div className="contaniner-sm m-5">
        <form className="contaniner m-3" ref={formRef}>
          <h1 className="text-center mt-3 p-1" style={{ color: '#fe5a59' }} >Agregar curso</h1>
          <hr />
          <div className="shadow p-4 mb-2 bg-white rounded form-group mx-10">
            <div className="mb-3">
              <label className="form-label">Disponibilidad del curso</label>
              <Select
                placeholder="Seleccione la disponibilidad"
                name="disponibilidad"
                options={options}
                onChange={(event) => { //Con este evento se esta pendiente de los cambios que realice el usuario y los aplica al state
                  setState({ ...state, disponibilidad: event.value })
                }} />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre del curso</label>
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
            <div className="mb-3">
              <label className="form-label">Descripción del curso</label>
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
            <div className="mb-3">
              <label className="form-label">Duración del curso</label>
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
            <div className="mb-3">
              <label className="form-label">Precio del curso</label>
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
        <div className="position-relative mt-3">
          <button className="btn btn-dark btn-lg mb-5 top-0 start-50 position-absolute translate-middle"
            onClick={validate}>Crear</button>
        </div>
      </div>
    </Fragment>
  );
}

export default CursoFrom;