import React, { useReducer } from "react";
import Reducer from "../reducer/Reducer";
import Contexto from "./Contexto";

const StoreFromProvider = (props) => {

    const initialState = {
        usuario: { list: [], item: {} },
        curso: { list: [], item: {} }
    };

    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Contexto.Provider value={{
            state,
            dispatch
        }}>
            {props.children}
        </Contexto.Provider>
    );

}

export default StoreFromProvider;