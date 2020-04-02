import React, {Component} from 'react';
import Page from '../../Page';
import { Redirect } from 'react-router-dom';
import {saxios} from '../../../Utilities/Utilities';

import './ProductDetail.css';
export default class ProductDetail extends Component{
  constructor(){
    super();
    this.state = {}
    this.addMoreStock = this.addMoreStock.bind(this);
  }
  componentDidMount()
  {
    const prodId = this.props.match.params.id;
    saxios.get(
      `/api/artesanos/products/find/${prodId}`
    )
    .then((data)=>{
      this.setState(data.data);
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  addMoreStock(e){
    e.preventDefault();
    e.stopPropagation(); 
    const prodId = this.props.match.params.id;
    saxios.put(
      `/api/artesanos/products/stock/${prodId}`,
      {stock: 1}
    )
      .then((data) => {
        this.setState(data.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }
  render(){
      const prodId = this.props.match.params.id;
      if(!(prodId && true)){
        return (<Redirect to="/productos"/>)
      }
      var {sku, price, stock, name, imgUrl} = this.state;
      return (
        <Page pageTitle={sku} auth={this.props.auth}>
          <span className="detailitem">{sku}</span>
          <span className="detailitem">{name}</span>
          <span className="detailitem">{price}</span>
          <span className="detailitem">{stock}</span>

          <img className="detailimg" src={imgUrl} />
          <fieldset>
          <button onClick={this.addMoreStock}>Add One more Stock +</button>
          </fieldset>
        </Page>
      )
  }
}
