import React, {Component} from 'react';
import Page from '../../Page';
export default class Login extends Component{
  render(){
    return (
      <Page pageTitle="Iniciar">
        <fieldset>
          <label htmlFor="email">Correo</label>
          <input type="text" name="email" id="email"/>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password" />
        </fieldset>
        <button>Iniciar Sesión</button>
        <button>Crear Cuenta</button>
      </Page>
    );
  }
}
