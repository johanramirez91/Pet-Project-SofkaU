import React, { useReducer } from "react";
import ReducerUsuario from "../reducer/ReducerUsuario";
import ContextoUsuario from "./ContextoUsuario";

const StoreFromProvider = (props) => {

    const initialState = {
        usuario: { list: [], item: {} }
    };

    const [state, dispatch] = useReducer(ReducerUsuario, initialState);

    return (
        <ContextoUsuario.Provider value={{
            state,
            dispatch
        }}>
            {props.children}
        </ContextoUsuario.Provider>
    );

}

export default StoreFromProvider;