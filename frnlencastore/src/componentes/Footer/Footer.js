import React, {Component} from 'react';
import {IoIosLogIn, IoIosHome} from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import './Footer.css';

export default class Footer extends Component{
  constructor(){
    super();
    this.state = {
      counter:0
    }
    //Cualquier propio que ocupemos en una clase requiere
    // realizar el bind para poder acceder al estado y al api del componente.
    this.counterUpdate = this.counterUpdate.bind(this);
  }
  counterUpdate(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({counter:this.state.counter+1});
  }
  render(){
    return (
      <footer>
        <nav>
         <ul>
            <li><NavLink to="/"><IoIosHome />Home</NavLink></li>
            <li><NavLink to="/login"><IoIosLogIn /> Login</NavLink></li>
          </ul>
        </nav>
      </footer>
    );
  }
}

/*
Un componente en clase tiene de forma predeterminada
un conjunto de eventos que se ejecutan en distintos
puntos del ciclo de vida de un componente.

construye

mount

disponible

actualizacion

desmonta

destruye



 */
