import React, { useReducer } from 'react';
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
 } from '../../types'
import AlertaContext from './AlertaContext'
import AlertaReducer from './AlertaReducer'
 
const AlertaState = (props) => {

    const initialState = {
        alerta: null
    }

    //reducer retorna stateinicial y dispatch para ejecutar las acciones.
    const [state, dispatch] = useReducer(AlertaReducer, initialState)

    //funciones
    const mostrarAlerta = (msg, categoria) =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })
        //Despues de 5 segundos limpia la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
            })
        }, 1000);
    }

    return(
        <AlertaContext.Provider
            value = {{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    )

}

export default AlertaState