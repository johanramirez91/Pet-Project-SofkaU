import React, { Fragment, useEffect, useState } from "react";
import Users from "./components/Users";
import axios from "axios";
import { HOST_API } from "./config/hostApi";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/usuario/listar/")
      .then((response) => {
        setUsuarios(response.data);
        console.log(response.data)
      })
  }, []);


  return (
    <Fragment>
      <h3 className="text-center mt-3">Lista de Usuarios</h3>
      <Users usuarios={usuarios} />
    </Fragment>
  );
}

export default App;
