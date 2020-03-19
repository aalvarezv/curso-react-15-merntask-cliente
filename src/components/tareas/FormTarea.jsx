import React, { useContext, useState, useEffect } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContex'

const FormTarea = () => {
  
    const { proyecto } = useContext(ProyectoContext)
    const { errortarea, tareaseleccionada, agregarTarea, 
            obtenerTareasProyecto, validarTarea,
            modificarTarea, limpiarTarea } = useContext(TareaContext)

    const [tarea, setTarea] = useState({
        estado: false,
        nombre: '',
        proyecto: ''
    })
   
    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            setTarea(tareaseleccionada)
        }else{
            setTarea({
                estado: false,
                nombre: '',
                proyecto: ''
            })
        }

    }, [tareaseleccionada])

    const { nombre } = tarea

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value, 
            proyecto: proyecto._id
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        //validar el formulario
        if(nombre.trim() === ''){
            validarTarea()
            return
        }

        //Agrega tarea si no tengo una para editar.
        if(tareaseleccionada === null){
            //pasa la validacion
            agregarTarea(tarea)
        }else{
            modificarTarea(tarea)
            limpiarTarea()
        }

        //filtra las tareas del proyecto
        obtenerTareasProyecto(proyecto._id)
        //reinicia el formulario
        setTarea({
            ...tarea,
            nombre : '',
            proyecto: ''
        })
    }

    return (
        <div className="formulario">
        {proyecto
        ?
            <form 
                onSubmit={handleSubmit}
            > 
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        onChange={handleChange}
                        value = {nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada === null ? 'Agregar Tarea' : 'Modificar Tarea'}
                    />
                </div>
            </form>
        : null }
        {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null}
        </div>
    )
}
 
export default FormTarea;