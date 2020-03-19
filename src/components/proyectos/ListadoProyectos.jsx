import React, { useContext, useEffect } from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import AlertaContext from '../../context/alertas/AlertaContext'

const ListadoProyectos = () => {

    //Extraer proyectos de state inicial
    const ProyectosContext = useContext(ProyectoContext)
    const { mensaje, proyectos, obtenerProyectos } = ProyectosContext

    const { alerta, mostrarAlerta } = useContext(AlertaContext)
    //Obtenemos los proyectos cuando carga el componente.
    //(eslint-disable-next-line) Elimina un warning de la consola cuando exige una dependencia y sabemos que está bien
    //en este caso exige poner la dependencia a obtenerProyectos() pero si se agrega entonces la aplicación se va a loopear.
    useEffect(() => {
        //si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
            return
        }

        obtenerProyectos()
        
        //eslint-disable-next-line
    }, [mensaje])

    //Verifica si hay proyectos
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno.</p>

    return (  
        <ul className="listado-proyectos"> 
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    > 
                        <Proyecto proyecto={proyecto} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default ListadoProyectos;