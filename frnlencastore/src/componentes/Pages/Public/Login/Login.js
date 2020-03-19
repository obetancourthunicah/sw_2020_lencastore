import React, {Component} from 'react';
import Page from '../../Page';
export default class Login extends Component{
  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(e){
    const  {name, value} =e.currentTarget;
    this.setState({
      ...this.state,
      [name]:value
    });
  }
  render(){
    return (
      <Page pageTitle="Iniciar">
        <fieldset>
          <label htmlFor="email">Correo</label>
          <input type="text" name="email"
            id="email" value={this.state.email}
            onChange={this.onChangeHandler}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password"
          id="password" value={this.state.password}
          onChange={this.onChangeHandler}/>
        </fieldset>
        <button>Iniciar Sesión</button>
        <button>Crear Cuenta</button>
      </Page>
    );
  }
}
