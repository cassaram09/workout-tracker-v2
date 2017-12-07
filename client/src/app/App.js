import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Store from '/src/app/store/store'
import Main from '/src/app/components/main/main';
import Login from '/src/app/components/login/login';
import SideBar from '/src/app/components/sideBar/sideBar';


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
          <SideBar session={this.props.session} user={this.props.user} />
          <Main session={this.props.session} user={this.props.user} />
        </div>
      )
    } else {
      return (
        <div className='app'>
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