import React, { useContext } from 'react'
import TareaContext from '../../context/tareas/TareaContex'

const Tarea = ({tarea}) => {

    const { _id, nombre, estado, proyecto } = tarea
    const { eliminarTarea, obtenerTareasProyecto, modificarTarea,
            guardarTareaActual } = useContext(TareaContext)
  
    //Elimina la tarea
    const handleEliminar = () => {
      eliminarTarea(_id, proyecto)
      obtenerTareasProyecto(proyecto)
    }

    //Cambia el estado de la tarea
    const handleCambiarEstado = () => {
      if(tarea.estado){
          tarea.estado = false
      }else{
        tarea.estado = true
      }
      console.log(tarea)
      modificarTarea(tarea)
    }

    //Const selecciona una tarea para editar
    const handleModificar = () => {
      guardarTareaActual(tarea)
    }

    return ( 
        <li className="tarea sombra">
            <p>{nombre}</p>
            <div className="estado">
                {estado 
                ? 
                  (
                    <button 
                       type="button"
                       className="completo"
                       onClick = {handleCambiarEstado}
                    >Completo</button>
                   )
                :
                  (
                    <button 
                       type="button"
                       className="incompleto"
                       onClick = {handleCambiarEstado}
                    >Incompleto</button>
                  )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={handleModificar}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={handleEliminar}
                >Eliminar</button>
            </div>
        </li>
        );
}
 
export default Tarea;