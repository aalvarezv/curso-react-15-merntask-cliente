import React, { useReducer } from 'react';
import { TAREAS_PROYECTO,
         AGREGAR_TAREA,
         VALIDAR_TAREA,
         ELIMINAR_TAREA,
         TAREA_ACTUAL,
         MODIFICAR_TAREA,
         LIMPIAR_TAREA,
        } from '../../types'
import TareaContext from './TareaContex'
import TareaReducer from './TareaReducer'
import clienteAxios from '../../config/axios'

const TareaState = (props) => {

    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //reducer retorna stateinicial y dispatch para ejecutar las acciones.
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    const obtenerTareasProyecto = async proyecto => {
          
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } })
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    }
    //Graba una tarea en el state
    const agregarTarea = async tarea => {
        try{
           
            const respuesta = await clienteAxios.post('/api/tareas/', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta.data.tarea
            })

        }catch(error){
            console.log(error.response)
        }
        
    }
    //Verifica que se ingrese la tarea antes de guardarla.
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    //Elimina una tarea
    const eliminarTarea = async (tareaId, proyecto) => {
       
        try {
            const respuesta = await clienteAxios.delete(`/api/tareas/${tareaId}`, {params: {proyecto}})
            console.log(respuesta)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            })
        } catch (error) {
            console.log(error)
        }
       
    }

     //Modifica una tarea
     const modificarTarea = async tarea => {

        try {
            
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            console.log(resultado)
            dispatch({
                type: MODIFICAR_TAREA,
                payload: resultado.data.tarea
            })

        } catch (error) {
            console.log(error)
        }
    }

    //Obtiene la tarea seleccionada para editar.
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Limpiar tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (  
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareasProyecto,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                modificarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>

    );
}
 
export default TareaState;