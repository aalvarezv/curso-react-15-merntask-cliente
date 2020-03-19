import React, { useReducer } from 'react'
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'

import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null, //boolean
        usuario: null, //objeto {}
        mensaje: null, //objeto {}
        cargando: true //boolean
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState) 

    //funciones
    const registrarUsuario = async datos => {

        try {
            const respuesta = await clienteAxios.post('/api/usuarios/', datos);
            
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            usuarioAutenticado()

        } catch (error) {
          
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }

    }

    //trae los datos del usuario autenticado, cuando se genera el token, en su payload se agrega el usuario id 
    //y con eso se rescatan los datos del usuario de la base 
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token')
        if(token){
            //funcion para enviar el token por headers
            tokenAuth(token)
        }

        try {

            const respuesta = await clienteAxios.get('/api/auth/')
            //console.log(respuesta)
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

        } catch (error) {

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }

    }   

    const iniciarSesion = async datos => {

        try {

            const respuesta = await clienteAxios.post('/api/auth/', datos)
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            usuarioAutenticado()

        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState