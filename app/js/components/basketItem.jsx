import React from 'react';
import AppActionCreator from '../actions/AppActionCreator';
import 'string-format' ;
import numbr from 'numbr'


var BasketItem = React.createClass({
  render() {
    var item = this.props.item;
    return (
      <div id={"{}-basket".format(item.id)} title={item.title} className="product-item fade-in">
        <span className="close glyphicon glyphicon-remove-circle"  onClick={this._onClickRemoveAll} title="Remove all"></span>
        <ul>
          <li>{"Price : {}".format(numbr(item.value).format('£0,0.00'))}</li>
          <li>{"({}) {}".format(item.quantity, item.title)}</li>
        </ul>
        <a className="btn-link-custom" onClick={this._onClickRemoveItem} title="Remove one">Remove item</a>
      </div>
    );
  },
  _onClickRemoveItem() {
    AppActionCreator.removeItemFromKart(this.props.item.id);
  },
  _onClickRemoveAll() {
    AppActionCreator.removeAllItemsFromKart(this.props.item.id);
  }
});

export default BasketItem;