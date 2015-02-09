var React = require('react');
var BasketStore = require('../stores/BasketStore');
var ProductComponent = require('../components/ProductComponent');
var numberUtil = require('numbr');
var Modal = require('react-bootstrap').Modal;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
require('string-format');

var BasketList = React.createClass({
  getInitialState() {
    return this._getStateFromStore();
  },
  componentWillMount() {
    BasketStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    BasketStore.removeChangeListener(this._onChange);
  },
  render() {
    return (
      <div className="kart-list">
        {(this.state.numberOfItems > 0 ) ? this._getConsole() : ""}
        <div>
        {this._renderItem()}
        </div>
        {(this.state.numberOfItems > 0 ) ? this._getCheckoutButton() : ""}
      </div>
    )
  },
  _getCheckoutButton() {
    return (
      <ModalTrigger modal={this._getModal()} container={this}>
        <button className="btn btn-warning col-xs-12 " onClick={this._onClick}>
          <span className="glyphicon glyphicon-shopping-cart"> </span>
        &nbsp; Proceed to checkout
        </button>
      </ModalTrigger>
    )
  },
  _getConsole() {
    return (
      <div className="well panel panel-success ">
        <p>{"Subtotal ({} item)".format(this.state.numberOfItems)}</p>
        <div className="panel-heading">{"{}".format(numberUtil(this.state.total).format('£0,0.00')) }</div>
      </div>
    )
  },
  _renderItem() {
    return this.state.items.map(item => {
      return <ProductComponent renderType="basket" item={item} />
    })
  },
  _onChange() {
    this.setState(this._getStateFromStore());
  },
  _getModal() {
    return (
      <Modal {...this.props}  className="col-xs-6" title='Your purchase was successful' animation>
        <div className="panel">
          <h3 className="panel-heading">Thank You</h3>
        </div>
      </Modal>
    )
  },
  _getStateFromStore() {
    function numOfItems() {
      var items = BasketStore.getAll(),
        num = 0;
      for (var i = 0; i < items.length; i++) {
        num += Number(items[i].quantity);
      }
      return num;
    }
    return {
      items: BasketStore.getAll(),
      total: BasketStore.getTotalCost(),
      numberOfItems: numOfItems()
    }
  }
});

module.exports = BasketList;

