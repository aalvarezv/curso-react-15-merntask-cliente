import React, { useContext } from 'react'
import AuthContext from '../../context/autenticacion/AuthContext'

const Barra = (props) => {

    //Extraer la información de autenticacion
    const { usuario, cerrarSesion } = useContext(AuthContext)
    

    const handleClick = () => {
        cerrarSesion()
    }

    return ( 
        <header className="app-header">
            {usuario 
            ? <p className="nombre-usuario">Hola <span> {usuario.nombre}</span></p>
            : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={handleClick}
                >Cerrar Sesión</button>
            </nav>
        </header>

     );
}
 
export default Barra;