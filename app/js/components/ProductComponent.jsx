var React = require('react');
var AppActionCreator = require('../actions/AppActionCreator');
var ProductsStore = require('../stores/ProductsStore');
var Rating = require('./Rating');
var _ = require('lodash');
var numberUtil = require('numbr');
require('string-format');

var ProductComponent = React.createClass({
  propTypes: {
    renderType: React.PropTypes.string,
    item: React.PropTypes.object
  },
  render() {
    switch (this.props.renderType) {
      case "table":
        return this._tableView();
        break;
      case "list":
        return this._listView();
        break;
      case "basket":
        return this._basketView();
        break
    }
  },
  _tableView() {
    var item = this.props.item;
    return <div id={ item.id} title={item.title} className={this.props.className}>
      <div className="inner clearfix">
        <img src={item.image} title={item.title} className="constrained-h"/>
        <ul>
          <li>{_.trunc(item.title, 32)}</li>
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
          <li>{"Price : {}".format(numberUtil(item.value).format('£0,0.00'))}</li>
        </ul>
        <button className="btn btn-success" onClick={this._onClick}>Add to Basket </button>
      </div>
    </div>
  },
  _listView() {
    var item = this.props.item;
    return <div id={ item.id} title={item.title} className={this.props.className}>
      <div className="inner-list clearfix">
        <img  className="col-xs-4 constrained-w" src={item.image} title={item.title}/>

        <ul className="col-xs-7" >
          <li>
            <strong>{ item.title}</strong>
          </li>
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
          <li>{"Price : {}".format(numberUtil(item.value).format('£0,0.00'))}</li>
        </ul>
        <button className="btn btn-success" onClick={this._onClick}>Add to Basket </button>
      </div>
    </div>
  },
  _basketView() {
    var item = this.props.item;
    return (
      <div id={"{}-basket".format(item.id)} title={item.title} className="product-item fade-in">
        <span className="close glyphicon glyphicon-remove-circle"  onClick={this._onClickRemoveAll} title="Remove all"></span>
        <ul>
          <li>{"Price : {}".format(numberUtil(item.value).format('£0,0.00'))}</li>
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
  },
  _onClick() {
    var item = ProductsStore.getItemById(this.props.item.id);
    AppActionCreator.addToKart(item);
  }
});

module.exports = ProductComponent;