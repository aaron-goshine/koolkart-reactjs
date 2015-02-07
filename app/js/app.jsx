import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPanel from './components/ProductsPanel';
import BasketList from './components/BasketList';
import AppActionCreator from './actions/AppActionCreator'

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

