import { TAREAS_PROYECTO,
         AGREGAR_TAREA,
         VALIDAR_TAREA,
         ELIMINAR_TAREA,
         ESTADO_TAREA,
         TAREA_ACTUAL,
         MODIFICAR_TAREA,
         LIMPIAR_TAREA,
        } from '../../types'

export default (state, action) => {

    switch (action.type)
    {
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasproyecto : [ ...state.tareasproyecto, action.payload],
                errortarea: false
            }
        case TAREAS_PROYECTO:
            return{
                ...state,
                tareasproyecto : action.payload
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ESTADO_TAREA:
            return{
                ...state,
                tareasproyecto: [...state.tareasproyecto, state.tareasproyecto.find(tarea => tarea.id === action.payload.id).estado = !action.payload.estado]
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                tareaseleccionada: action.payload
            }
        case MODIFICAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaseleccionada: null
            }

        default:
         return state
    }
     

}