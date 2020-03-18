import React, {Component} from 'react';
import './App.css';
import Home from './componentes/Pages/Public/Home/Home';
import Login from './componentes/Pages/Public/Login/Login';
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
        <Login></Login>
      </div>
    );
  }
}

export default App;
