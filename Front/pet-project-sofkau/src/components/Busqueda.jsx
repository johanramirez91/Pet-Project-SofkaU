import React, { useState } from 'react'

const Busqueda = (busqueda) => {

    const [busqueda, setBusqueda] = useState("");
    const [filter, setFilter] = useState(busqueda)

    const handleChange = (event) => {
        let oldList = busqueda.map(elemento => {
            return {
                name: elemento.nombre.toLowerCase(),
                number: elemento.telefono,
                ubicacion: elemento.ubicacion,
                rol: elemento.rol,
                fecha: elemento.fechaIngreso
            }
        })

        if (event !== "") {
            let newList = [];
            setBusqueda(event);
            newList = oldList.filter(element => {

            })
        }
    }

    return (
        <div>

        </div>
    )
}

export default Busqueda
