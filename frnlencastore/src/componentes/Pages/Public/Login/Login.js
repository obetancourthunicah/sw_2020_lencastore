import React, {Component} from 'react';
import Page from '../../Page';
import './Login.css';
export default class Login extends Component{
  /*
  1) Capturar los eventos de los botones
  2) Repasar el evento para capturar los datos del formulario
  3) Validaciones de Datos y como desplegarlo en el componente
  4) Usar axios para llegar al API. 
   */
  constructor(){
    super();
    this.state = {
      email:'',
      emailError:null,
      password:'',
      passwordError:null
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickCreateAccount = this.onClickCreateAccount.bind(this);
    this.validate = this.validate.bind(this);
  }
  validate(state){
    let nameErrors = null;
    let tmpErrors = [];
    const {email, password} = state;
    console.log(email, password)
    if(email !== undefined){
      if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(email)) {
        tmpErrors.push("El correo debe tener formato correcto");
      }
      if ((/^\s*$/.test(email))) {
        tmpErrors.push("Debe Ingresar Correo Adecuado");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({},nameErrors, {emailError:tmpErrors.join('. ')});
      }
    }
    if (password !== undefined){
      tmpErrors = [];
      if ((/^\s?$/.test(password))) {
        tmpErrors.push("Debe Ingresar Contraseña Adecuado");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { passwordError: tmpErrors.join('. ') });
      }
    }
      return nameErrors;
  }
  onChangeHandler(e){
    const  {name, value} =e.currentTarget;
    // Aqui puedo validar datos y establecer elementos de error.
    console.log({ [name]: value });
    let errors = this.validate({[name]:value});
    console.log(errors);
    if (!errors){
      errors = {[name+"Error"]:''};
    }
    this.setState({
      ...this.state,
      [name]:value,
      ...errors
    });
  }
  onClickLogin(e){
    e.preventDefault();
    e.stopPropagation();
    //Validaciones
    const errors = this.validate(this.state);
    console.log(errors);
    if(errors){
      this.setState({...this.state, ...errors});
    } else {
        alert("Todo Cool");
    }
  }
  onClickCreateAccount(e){
    e.preventDefault();
    e.stopPropagation();
    alert("Click en Crear Cuenta");
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
          {(this.state.emailError && true)? (<span className="error">{this.state.emailError}</span>): null}
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password"
          id="password" value={this.state.password}
          onChange={this.onChangeHandler}/>
          {(this.state.passwordError && true) ? (<span className="error">{this.state.passwordError}</span>) : null}
        </fieldset>
        <fieldset className="action">
          <button onClick={this.onClickLogin}>Iniciar Sesión</button>
          <button onClick={this.onClickCreateAccount}>Crear Cuenta</button>
        </fieldset>
      </Page>
    );
  }
}
