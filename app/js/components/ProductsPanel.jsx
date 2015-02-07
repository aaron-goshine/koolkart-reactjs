import React from 'react';
import ProductsStore from '../stores/ProductsStore';
import ProductComponent from '../components/ProductComponent';
import  _ from 'lodash';

var ProductsPanel = React.createClass({
  getInitialState() {
    return this._getStateFromStore();
  },
  componentWillMount() {
    ProductsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    ProductsStore.removeChangeListener(this._onChange);
  },
  render() {
    return (
      <div className="panel-custom">
        <header className="panel-header">
          <p><strong>Inspired by Your Shopping Trends</strong></p>
          <p>Your Recently Viewed Items and Featured Recommendations</p>
        </header>
        {this._renderItems()}
      </div>
    )
  },
  _renderItems() {
    var table = _.chunk(this.state.items, 3);
    return table.map(item => {
      return <div className="row"> {
        item.map(unit => {
          return <ProductComponent  className="col-xs-4 product-unit" item={unit} />;
        })}</div>
    })
  },
  _onChange() {
    console.log("the store have changed");
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore() {
    return {
      items: ProductsStore.getAll()
    }
  }
});


export default   ProductsPanel;