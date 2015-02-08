import React from 'react';
import ProductsStore from '../stores/ProductsStore';
import ProductComponent from '../components/ProductComponent';
import  _ from 'lodash';
import  {ButtonGroup, MenuItem ,DropdownButton,Button } from 'react-bootstrap'

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
        <header className="main-header">
          <ButtonGroup>
            <DropdownButton eventKey={3} onSelect={this._onSelectDown} title="Sort By:">
              <MenuItem eventKey="1">title</MenuItem>
              <MenuItem eventKey="2">price</MenuItem>
              <MenuItem eventKey="3">rating</MenuItem>
            </DropdownButton>
            <Button onClick={this._onSelectListView}>
              <span className="glyphicon glyphicon-th-list"></span>
            </Button>
            <Button onClick={this._onSelectListTable} >
              <span className="glyphicon glyphicon-th"></span>
            </Button>
          </ButtonGroup>
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
  _onSelectListView(event) {
    console.log(event);
  },
  _onSelectListTable(event) {
    console.log(event);
  },
  __onSelectDown(event) {
    console.log(event);
  },
  _onChange() {
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore() {
    return {
      items: ProductsStore.getAll()
    }
  }
});


export default   ProductsPanel;