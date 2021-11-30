import React, { Fragment, useEffect, useState } from "react";
import Users from "./components/Users";
import axios from "axios";
import { HOST_API } from "./config/hostApi";
import { Col, Container, Row } from "reactstrap";

function App() {

  const [usuarios, setUsuarios] = useState([]);
  const cargarUsuarios = () => {
    axios.get(HOST_API + "/usuarios/listar").then((data) => setUsuarios(data))
  }

  useEffect(cargarUsuarios, [])

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <Users usuarios={usuarios} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
