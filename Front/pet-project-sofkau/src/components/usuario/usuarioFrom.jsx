import React, { Fragment, useContext, useRef, useState } from 'react';
import { HOST_API } from '../../config/hostApi';
import Contexto from '../contexto/Contexto';
import Select from 'react-select'
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const UsuarioFrom = () => {
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

  const redireccionar = () => {
    window.history.back();
  }

  const validate = (event) => { // Creamos una cuadro de confirmacion 
    swal({
      title: "¿Agregar?",
      text: "¡Se agregará este nuevo usuario a la base de datos!",
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
            onAdd(event);//Cuando sea exitoso se ira al evento de agregar
            history("/usuarios", { replace: true })//Cuando sea exitoso se regresa a la tabla principal
          });

        } else {
          swal("uff, que bueno que preguntamos");
          return;
        }
      });
  }

  const onAdd = (event) => {
    event.preventDefault();

    const request = {//Inicializamos los datos tomados en el state en un objeto
      nombre: state.nombre,
      id: null,
      rol: state.rol,
      email: state.email,
      telefono: state.telefono,
      ubicacion: state.ubicacion,
      fechaIngreso: state.fechaIngreso
    };

    axios.post(HOST_API + "/usuario/add", request).then(response => {  // se realiza la peticion pos
      redireccionar();// se redirecciona a la pagina anterior cuando el servidor nos responda
      formRef.current.reset(); //Limpiamos los campos
    })
  }

  return (// Retornamos un formulario
    <Fragment>
      <div className="contaniner-sm m-4">
        <form className="contaniner m-3" ref={formRef}>
          <h1 className="text-center mt-1" style={{ color: '#fe5a59' }} >Agregar nuevo usuario</h1>
          <hr />
          <div className="container-md shadow p-4 mb-3 bg-white rounded form-group mx-10">
            <div className="mb-2">
              <label className="form-label">Rol del usuario</label>
              <Select
                placeholder="Seleccione un rol"
                name="rol"
                options={options}
                onChange={(event) => { //Con este evento se esta pendiente de los cambios que realice
                  setState({ ...state, rol: event.value })
                }} />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre del usuario</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                placeholder="nombre"
                defaultValue={item.nombre}
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
                placeholder="email"
                defaultValue={item.email}
                onChange={(event) => {
                  setState({ ...state, email: event.target.value })
                }}  ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono del usuario</label>
              <input
                className="form-control"
                type="number"
                name="teléfono"
                placeholder="teléfono"
                defaultValue={item.telefono}
                onChange={(event) => {
                  setState({ ...state, telefono: event.target.value })
                }}  ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Ubicación del usuario</label>
              <input
                className="form-control"
                type="text"
                name="ubicación"
                placeholder="ubicación"
                defaultValue={item.ubicacion}
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
                placeholder="fecha Ingreso"
                defaultValue={item.fechaIngreso}
                onChange={(event) => {
                  setState({ ...state, fechaIngreso: event.target.value })
                }}></input>
            </div>
          </div>
        </form>
        <div className="position-relative mt-5">
          <button className="btn btn-dark btn-lg mb-5 top-0 start-50 position-absolute translate-middle"
            onClick={validate}>Crear</button>
        </div>
      </div>
    </Fragment>
  );
}

export default UsuarioFrom;