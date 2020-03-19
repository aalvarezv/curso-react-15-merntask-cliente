import React, {Fragment, useState, useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext'

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const ProyectosContext = useContext(ProyectoContext)
    const {formulario, errorproyecto, mostrarFormulario, 
           agregarProyecto, validarProyecto} = ProyectosContext

    const [proyecto, setProyecto] = useState({
        nombre: ''
    })

    const {nombre} = proyecto

    const handleChange = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        //validar el proyecto
        if(nombre.trim() === ''){
            validarProyecto()
            return
        }

        //agregar al state de proyectos
        agregarProyecto(proyecto)

        //reiniciar el form
        setProyecto({nombre: ''})

    }

    return (  
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
                >Nuevo Proyecto</button>
            {formulario 
             ?
                <form 
                    className="formulario-nuevo-proyecto"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />

                    <input
                        type="submit"
                        className="btn btn-primario"
                        value="Agregar Proyecto"
                    />

                </form>
             :
              null
            }
            {errorproyecto ? <p className="mensaje error" >El nombre del proyecto es obligatorio</p> : null }

        </Fragment>
       
    );
}
 
export default NuevoProyecto;