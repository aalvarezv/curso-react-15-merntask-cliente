import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO,
         VALIDAR_PROYECTO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO,
         PROYECTO_ERROR
       } from '../../types/'

export default (state, action) => {

    switch(action.type)
    {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state, //copia el state  
                proyectos: [...state.proyectos, action.payload], //  [...state.proyectos, action.payload] proyectos hace una copia y le agrega el nuevo proyecto que viene en el payload.
                formulario: false, //para ocultar el formulario una vez agregado el proyecto.
                errorproyecto: false
            }
        case VALIDAR_PROYECTO:
            return {
                ...state,
                errorproyecto: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter( proyecto => proyecto._id === action.payload )[0]     
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter( proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state
    }

}