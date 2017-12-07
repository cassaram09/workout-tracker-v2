import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Store from '/src/app/store/store'
import HomePage from '/src/app/components/home/homePage';
import Login from '/src/app/components/login/login';



// import Main from './containers/main/main';
// import Login from './containers/login/login'

class App extends Component {
  render() {
   if ( this.props.session == true ){
      return (
        <div className='app'>
          <HomePage/>
          
        </div>
      )
    } else {
      return (
        <div className='app'>
          <h1>Login</h1>
          <Login />
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => { 
  return {
    session: state.session,
  }
};

export default withRouter(connect(mapStateToProps)(App));