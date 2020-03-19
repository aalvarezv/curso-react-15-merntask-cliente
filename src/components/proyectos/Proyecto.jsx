import React, { useContext } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContex'

const Proyecto = ({proyecto}) => {

    const { _id } = proyecto
    const { proyectoActual } = useContext(ProyectoContext)
    const { obtenerTareasProyecto } = useContext(TareaContext)

    const handleClick = () => {
        proyectoActual(_id)
        obtenerTareasProyecto(_id)
    }

    return ( 
            <li>
                <button
                    type="button"
                    className="btn btn-blank"
                    onClick={handleClick}
                >{proyecto.nombre}</button>
            </li> 
           )
}
 
export default Proyecto;