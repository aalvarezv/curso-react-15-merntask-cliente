import React, { useReducer } from 'react'
import ProyectoContext from './ProyectoContext'
import ProyectoReducer from './ProyectoReducer'
import { FORMULARIO_PROYECTO, 
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO,
         VALIDAR_PROYECTO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO,
         PROYECTO_ERROR
       } from '../../types/'
import clienteAxios from '../../config/axios'

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario : false,
        errorproyecto: false,
        proyecto: null,
        mensaje: null,
    }

    //reducer retorna stateinicial y dispatch para ejecutar las acciones.
    const [state, dispatch] = useReducer(ProyectoReducer, initialState)

    //muestra el form para agregar un proyecto.
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

     //serie de funciones para el crud.
    const obtenerProyectos = async () => {

        try {
            const respuesta = await clienteAxios.get('/api/proyectos')
            
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: respuesta.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
       
    }

    //agrega un proyecto al state.
    const agregarProyecto = async proyecto =>{
        
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
        
    }

    const validarProyecto = () => {
        dispatch({
            type: VALIDAR_PROYECTO
        })
    }

    //selecciona el proyecto que el usuario dio clic
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //elimina el proyecto 
    const eliminarProyecto = async proyectoId => {

        try {
            
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })

        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
       
    }
   
    return (
        <ProyectoContext.Provider
            value = {{
                proyectos: state.proyectos,
                formulario : state.formulario,
                errorproyecto: state.errorproyecto,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                validarProyecto,
                proyectoActual,
                eliminarProyecto,
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )

}

export default ProyectoState