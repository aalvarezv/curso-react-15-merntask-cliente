import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/AlertaContext'
import AuthContext from '../../context/autenticacion/AuthContext'

const NuevaCuenta = (props) => {

    const [usuario, setUsuario] = useState({
        nombre:'',
        email: '',
        password: '',
        confirmar: ''
    })

    const { alerta, mostrarAlerta } = useContext(AlertaContext)
    const { mensaje, autenticado, registrarUsuario } = useContext(AuthContext)

    //En caso que el usuario se haya autenticado o registrado o sea un registro duplicado.
    useEffect(() => {
        if(autenticado){
            props.history.push('/principal')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, props.history])

    const {nombre, email, password, confirmar} = usuario

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        //validar que no haya campos vacíos
        if(nombre.trim() === '' || email.trim() === '' || 
           password.trim() === '' || confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error')
            return
        }

        //password minimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres','alerta-error')
            return
        }

        //password igual a confirmar 
        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales','alerta-error')
            return
        }

        //pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={handleChange}
                            value = {nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={handleChange}
                            value = {email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={handleChange}
                            value = {password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            onChange={handleChange}
                            value = {confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">Volver a iniciar sesion</Link>
            </div>
        </div>
    
        );
}
 
export default NuevaCuenta;