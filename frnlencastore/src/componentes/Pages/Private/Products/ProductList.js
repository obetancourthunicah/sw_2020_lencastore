import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {saxios} from '../../../Utilities/Utilities';
import Page from '../../Page';

export default class ProductList extends Component{
  constructor(){
    super();
    this.state = {
      products:[],
      page:0,
      loading:false,
    }
  }
  componentDidMount(){
    //cargar los productos
    saxios.get(
      "/api/version"
    )
    .then((resp)=>{
      console.log(resp.data);
    })
    .catch((error)=>{
      console.log(error);
    });

  }
  render(){
    return (
      <Page pageTitle="Productos" auth={this.props.auth}>
          <ul>
          <li>Productos</li>
          </ul>
      </Page>
    );
  }

}
