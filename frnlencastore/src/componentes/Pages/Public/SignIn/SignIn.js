import React, { Component } from 'react';
import Page from '../../Page';
import Field from '../../../Forms/Fields/Field';
import { Actions } from '../../../Forms/Buttons/Button';
import { emailRegex, emptyRegex } from '../../../Forms/Validators/Validators';
export default class Login extends Component {
  /*
  1) Capturar los eventos de los botones
  2) Repasar el evento para capturar los datos del formulario
  3) Validaciones de Datos y como desplegarlo en el componente
  4) Usar axios para llegar al API. 
   */
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: null,
      password: '',
      passwordError: null
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickCreateAccount = this.onClickCreateAccount.bind(this);
    this.validate = this.validate.bind(this);
  }
  validate(state) {
    let nameErrors = null;
    let tmpErrors = [];
    const { email, password } = state;
    if (email !== undefined) {
      if (!emailRegex.test(email)) {
        tmpErrors.push("El correo debe tener formato correcto");
      }
      if ((/^\s*$/.test(email))) {
        tmpErrors.push("Debe Ingresar Correo Adecuado");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { emailError: tmpErrors.join('. ') });
      }
    }
    if (password !== undefined) {
      tmpErrors = [];
      if ((emptyRegex.test(password))) {
        tmpErrors.push("Debe Ingresar Contraseña Adecuado");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { passwordError: tmpErrors.join('. ') });
      }
    }
    return nameErrors;
  }
  onChangeHandler(e) {
    const { name, value } = e.currentTarget;
    // Aqui puedo validar datos y establecer elementos de error.
    let errors = this.validate({ [name]: value });
    if (!errors) {
      errors = { [name + "Error"]: '' };
    }
    this.setState({
      ...this.state,
      [name]: value,
      ...errors
    });
  }
  onClickLogin(e) {
    e.preventDefault();
    e.stopPropagation();
    //Validaciones
    const errors = this.validate(this.state);
    if (errors) {
      this.setState({ ...this.state, ...errors });
    } else {
      //Aplicar Axios
      alert("Todo Cool");
    }
  }
  onClickCreateAccount(e) {
    e.preventDefault();
    e.stopPropagation();
    alert("Click en Crear Cuenta");
  }
  render() {
    return (
      <Page pageTitle="Nueva Cuenta">
        <Field
          name="email"
          caption="Correo"
          value={this.state.email}
          type="text"
          onChange={this.onChangeHandler}
          error={this.state.emailError}
        />
        <Field
          name="password"
          caption="Contraseña"
          value={this.state.password}
          type="password"
          onChange={this.onChangeHandler}
          error={this.state.passwordError}
        />
        <Actions>
          <button onClick={this.onClickCreateAccount}>Crear Cuenta</button>
          <button onClick={this.onClickLogin}>Iniciar Sesión</button>
        </Actions>
      </Page>
    );
  }
}
