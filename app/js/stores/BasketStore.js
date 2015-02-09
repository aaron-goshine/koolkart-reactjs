var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('lodash');
var _Items = [];

var BasketStore = _.assign(new EventEmitter, {
  getAll() {
    return _Items;
  },
  getTotalCost() {
    var total = 0;
    for (var i = 0; i < _Items.length; i++) {
      var productValue = Number(_Items[i].value) * Number(_Items[i].quantity);
      total += productValue;
    }
    return total;
  },
  addItem(item) {
    var tracker = false;
    for (var i = 0; i < _Items.length; i++) {
      if (_Items[i].id === item.id) {
        tracker = true;
        _Items[i].quantity++;
      }
    }
    if (!tracker) {
      item.quantity = 1;
      _Items.push(item);
    }

  },
  removeItem(id) {
    for (var i = 0; i < _Items.length; i++) {
      if (_Items[i].id === id) {
        if (_Items[i].quantity > 1) {
          _Items[i].quantity--;
        } else if (_Items[i].quantity >= 1) {
          _Items.splice(i, 1)
        }
      }
    }
  },
  removeAllItem(id) {
    for (var i = 0; i < _Items.length; i++) {
      if (_Items[i].id === id) {
        _Items.splice(i, 1)
      }
    }
  },
  emitChange() {
    this.emit(AppConstants.CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  }
});

AppDispatcher.register((payload) => {
  var action = payload.action;
  switch (action.actionType) {
    case AppConstants.ADD_TO_KART:
      BasketStore.addItem(action.item);
      break;
    case AppConstants.REMOVE_ITEM_FROM_KART:
      BasketStore.removeItem(action.id);
      break;
    case AppConstants.REMOVE_FROM_KART:
      BasketStore.removeAllItem(action.id);
      break;
    default:
      return true;
  }

  BasketStore.emitChange();
  return true;
});

module.exports = BasketStore;