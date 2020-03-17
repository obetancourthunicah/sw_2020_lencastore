import React, {Component} from 'react';
import './App.css';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user:{},
      isLogged:false,
      loadingBackend:false
    };

    this.login = this.login.bind(this);
  }
  login(e, user){
    const { email, id , roles} = user;
    this.setState({
        ...this.state,
        isLogged:true,
        loadingBackend:false,
        user:user
      });
    alert(JSON.stringify(this.state));
  }
  render(){
    return (
      <div className="App">
        <Header login={this.login}>{this.state.user.email || "Hola Mundo"}</Header>
        <Footer>Pie de Página</Footer>
        <Footer>Pie de Página 2</Footer>
      </div>
    );
  }
}

export default App;
