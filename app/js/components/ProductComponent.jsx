import React from 'react';
import AppActionCreator from '../actions/AppActionCreator';
import format from 'string-format';
import ProductsStore from '../stores/ProductsStore';
import Rating from './Rating';
import _ from 'lodash';
import 'string-format';
import numbr from 'numbr';

var ProductComponent = React.createClass({
  render() {
    var item = this.props.item;
    return this.rod(item);
  },
  rod(item) {
    return <div id={ item.id} title={item.title} className={this.props.className}>
      <div className="inner clearfix">
        <img src={item.image} title={item.title}/>
        <li>{_.trunc(item.title, 32)}</li>
        <ul>
          <li>
            By: {item.authors}
          </li>
          <li>
          {item.productType}
          </li>
          <li>
            <Rating score={item.rating}/>
          </li>
          <li>
          {"({}) customer reviews".format(item.ratings)}
          </li>
          <li>{"Price : {}".format(numbr(item.value).format('£0,0.00'))}</li>
        </ul>
        <button className="btn btn-success" onClick={this._onClick}>Add to Basket </button>
      </div>
    </div>
  },
  _onClick() {
    var item = ProductsStore.getItemById(this.props.item.id);
    AppActionCreator.addToKart(item);
  }
});

export default  ProductComponent;