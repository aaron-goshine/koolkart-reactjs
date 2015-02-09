var React = require('react');
var Header = require('./components/Header');
var Footer  = require('./components/Footer');
var ProductsPanel  = require('./components/ProductsPanel');
var BasketList  = require('./components/BasketList');
var AppActionCreator  = require('./actions/AppActionCreator');

var App = React.createClass({
  componentDidMount() {
    AppActionCreator.init();
  },
  render() {
    return (
      <section  id="main" >
        <section className="main-section clearfix">
          <ProductsPanel/>
          <BasketList/>
        </section>
        <Footer/>
      </section>
    )
  }
});
React.render(
  <App/>,
  document.getElementById('main-app')
);

//<ProductsPanel/>
//<BasketList/>
//<Footer/>