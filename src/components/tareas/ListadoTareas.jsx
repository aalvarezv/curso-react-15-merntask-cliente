import React, {Fragment, useContext} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContex'


const ListadoTareas = () => {

    const { proyecto, eliminarProyecto } = useContext(ProyectoContext)
    const { tareasproyecto } = useContext(TareaContext)

    if(!proyecto) return null

    return ( 
        <Fragment>
            <h2>{proyecto ? `Proyecto: ${proyecto.nombre}` : 'Selecciona un Proyecto'}</h2>
            <ul className="listado-tareas">
            {tareasproyecto.length === 0  
                ? (<li className="tarea">No hay tareas</li>)
                : <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea  
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                  </TransitionGroup>
            }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick= {() => eliminarProyecto(proyecto._id)}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;