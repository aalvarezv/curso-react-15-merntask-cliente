import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Principal from './components/layout/Principal'

import ProyectoState from './context/proyectos/ProyectoState'
import TareaState from './context/tareas/TareaState'
import AlertaState from './context/alertas/AlertaState'
import AuthState from './context/autenticacion/AuthState'
import tokenAuth from './config/token'
import RutaPrivada from './components/rutas/RutaPrivada'

function App() {

  //Revisar si tenemos un token
  const token = localStorage.getItem('token')
  if(token){
    tokenAuth(token)
  }
  
  return (
  <ProyectoState>
  <TareaState>
  <AlertaState>
  <AuthState>
   <Router>
     <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
        <RutaPrivada exact path="/principal" component={Principal} />
     </Switch>
   </Router>
   </AuthState>
   </AlertaState>
   </TareaState>
   </ProyectoState>
  );
}

export default App;
