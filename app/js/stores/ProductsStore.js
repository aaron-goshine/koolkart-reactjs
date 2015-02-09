var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('lodash');

var CHANGE_EVENT = 'change';
var _state = {
  items: [],
  view:  AppConstants.SELECT_TABLE_VIEW,
  sortedBy: ''
};

function setItems(items) {
  _state.items = items;
}

function setView(name) {
  _state.view = name;
}

function sortItems(index) {
  var keyMap = ["title","value","rating"];
  _state.sortedBy = keyMap[index];
  _state.items = _.sortBy(_state.items,keyMap[index]);
}

var ProductsStore = _.assign(new EventEmitter, {
  getState() {
    return _state;
  },
  getAll() {
    return _state.items;
  },
  getItemById(id) {
    return _.filter(_state.items, {id: id})[0];
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register((payload) => {
  var action = payload.action;
  switch (action.actionType) {
    case AppConstants.SELECT_LIST_VIEW :
      setView(AppConstants.SELECT_LIST_VIEW);
      ProductsStore.emitChange();
      break;
    case AppConstants.SELECT_TABLE_VIEW:
      setView(AppConstants.SELECT_TABLE_VIEW);
      ProductsStore.emitChange();
      break;
    case AppConstants.SORT_BY_KEY :
      sortItems(action.index);
      ProductsStore.emitChange();
      break;
    case AppConstants.INIT:
      setItems(action.data);
      ProductsStore.emitChange();
      break;
  }
  return true;
});

module.exports = ProductsStore;
