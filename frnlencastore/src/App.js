import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  PrivateRoute  from './componentes/SecureRoutes/SecureRoute';
import { setJWTBearer, setLocalStorage, getLocalStorage, removeLocalStorage } from './componentes/Utilities/Utilities';

import Home from './componentes/Pages/Public/Home/Home';
import Login from './componentes/Pages/Public/Login/Login';
import Signin from './componentes/Pages/Public/SignIn/SignIn';

import ProductList from './componentes/Pages/Private/Products/ProductList';


class App extends Component {
  constructor(){
    super();
    this.state = {
      user: getLocalStorage('user')||{},
      jwt: getLocalStorage('jwt') || '',
      isLogged:false,
      loadingBackend:false
    };
    if(this.state.jwt !== ''){
      this.state.isLogged = true;
      setJWTBearer(this.state.jwt);
    }
    
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login(user){
    const {jwt, ...fuser} = user;
    this.setState({
        ...this.state,
        isLogged:true,
        loadingBackend:false,
        user:fuser,
        jwt: jwt,
      });
    setJWTBearer(jwt);
    setLocalStorage('jwt', jwt);
    setLocalStorage('user', fuser);
  }
  logout(){
    removeLocalStorage('jwt');
    removeLocalStorage('user');
    this.setState({
        ...this.state,
        isLogged: false,
        loadingBackend: false,
        user: {},
        jwt: ''
      }
    )
  }
  render(){
    const auth = {
      isLogged: this.state.isLogged,
      user: this.state.user,
      logout: this.logout,
     }
     console.log(auth);
    return (
      <Router>
        <div className="App">
          <Route render={(props) => { return (<Home {...props} auth={auth} />) }} path="/" exact />
          <Route render={(props)=>{return (<Login {...props} auth={auth} login={this.login} />)}} path="/login" exact/>
          <Route render={(props) => { return (<Signin {...props} auth={auth}/>) }} path="/signin" exact />
          <PrivateRoute component={Home} path="/privatehome" exact auth={auth} />
          <PrivateRoute component={ProductList} path="/productos" exact auth={auth} />
        </div>
      </Router>
    );
  }
}

export default App;
