import React from 'react';
import ProductsStore from '../stores/ProductsStore';
import AppActionCreator from '../actions/AppActionCreator';
import ProductComponent from '../components/ProductComponent';
import KartConstants from '../constants/KartConstants';
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
            <DropdownButton  onSelect={this._onSelectDropdown} title="Sort By:">
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
    console.log(">>===============|>>");
    console.log(this.state.viewType);
    console.log(KartConstants.SELECT_LIST_VIEW);
    console.log(">>===============|>>");
    switch (this.state.viewType) {
      case KartConstants.SELECT_TABLE_VIEW:
       return this._renderTable();
        break;
      case KartConstants.SELECT_LIST_VIEW:
        return this._renderList();
        break;
    }

  },
  _renderTable() {
    var table = _.chunk(this.state.items, 3);
    return table.map(item => {
      return <div className="row"> {
        item.map(unit => {
          return <ProductComponent  className="col-xs-4 product-unit" item={unit} />;
        })
        }</div>
    })
  },
  _renderList() {
    return this.state.items.map(item => {
      return <div className="row">
        <ProductComponent  className="col-xs-4 product-unit" item={item} />
      </div>
    })
  },
  _onSelectListView() {
    AppActionCreator.selectListView();
  },
  _onSelectListTable() {
    AppActionCreator.selectTableView();
  },
  _onSelectDropdown(index) {
    AppActionCreator.sortBykey(index);
  },
  _onChange() {
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore() {
    return {
      items: ProductsStore.getAll(),
      viewType: ProductsStore.getState().view
    }
  }
});


export default   ProductsPanel;