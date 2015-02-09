var React = require('react');
var ProductsStore = require('../stores/ProductsStore');
var AppActionCreator = require('../actions/AppActionCreator');
var ProductComponent = require('../components/ProductComponent');
var AppConstants = require('../constants/AppConstants');
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var MenuItem = require('react-bootstrap').MenuItem;
var DropdownButton = require('react-bootstrap').DropdownButton;
var Button = require('react-bootstrap').Button;
var _ = require('lodash');

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
            <DropdownButton  onSelect={this._onSelectDropdown} title={"Sorted by : {}".format(this.state.sortedBy)}>
              <MenuItem eventKey="0">title</MenuItem>
              <MenuItem eventKey="1">value</MenuItem>
              <MenuItem eventKey="2">rating</MenuItem>
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
    switch (this.state.viewType) {
      case AppConstants.SELECT_TABLE_VIEW:
        return this._renderTable();
        break;
      case AppConstants.SELECT_LIST_VIEW:
        return this._renderList();
        break;
    }
  },
  _renderTable() {
    var table = _.chunk(this.state.items, 3);
    return table.map(item => {
      return <div className="row"> {
        item.map(unit => {
          return <ProductComponent renderType="table" className="col-xs-4 product-unit" item={unit} />;
        })
        }</div>
    })
  },
  _renderList() {
    return this.state.items.map(item => {
      return (
        <div className="row">
          <ProductComponent renderType="list" className="col-xs-12 product-unit" item={item} />
        </div>
      )
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
      viewType: ProductsStore.getState().view,
      sortedBy :  ProductsStore.getState().sortedBy
    }
  }
});


module.exports = ProductsPanel;