import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
return import('./containers/Checkout/Checkout'); 
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth'); 
  });
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders'); 
    });

class App extends Component {

  componentDidMount(){
    this.props.onAutoSignin()
  }

  render() {
    let routes = null;
    if (!this.props.isAuth){
      routes = (
            <Switch>
              <Route path='/auth'  component={asyncAuth}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect  to='/'/>
          </Switch>
      );
    } else {
      routes = (
          <Switch>
              <Route path='/checkout'  component={asyncCheckout}/>
              <Route path='/orders'  component={asyncOrders}/>
              <Route path='/auth'  component={asyncAuth}/>
              <Route path='/logout'  component={Logout}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect  to='/'/>
        </Switch>
      );
    }
  

    return (
        <div>
          <Layout>
              {routes}
          </Layout>
        </div>
      
    );
  }
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
