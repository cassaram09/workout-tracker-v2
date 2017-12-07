import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Store from '/src/app/store/store'
import HomePage from '/src/app/components/home/homePage';
import Login from '/src/app/components/login/login';

import $R_User from '/src/app/utils/user'



class App extends Component {

  componentWillMount(){
    if (this.props.session == true) {
      $R_User.dispatchAction('getCurrentUser')(Store.dispatch)
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.session == true && !this.props.user.id) {
      $R_User.dispatchAction('getCurrentUser')(Store.dispatch)
    }
  }

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
    user: state.user
  }
};

export default withRouter(connect(mapStateToProps)(App));