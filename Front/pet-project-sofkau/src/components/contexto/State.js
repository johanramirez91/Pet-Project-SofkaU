import React, { useReducer } from "react";
import Reducer from "../reducer/Reducer";
import Contexto from "./Contexto";

const StoreFromProvider = (props) => { //Esta es la clase padre provider, la cual permite tener un contexto de los componentes

    const initialState = { // Se inicializa los states
        usuario: { list: [], item: {} },
        curso: { list: [], item: {} }
    };

    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Contexto.Provider value={{ //Compartimos el el state con todos los componentes dentro del provider
            state,
            dispatch
        }}>
            {props.children}
        </Contexto.Provider>
    );

}

export default StoreFromProvider;