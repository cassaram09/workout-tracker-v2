import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Store from '/src/app/store/store';  
import $R_Auth from '/src/app/utils/auth';
import Home from '/src/app/components/home/home'

class SideBar extends Component {
  constructor(props){
    super(props)

    this.logOut = (event) => {
      event.preventDefault();
      this.props.actions.dispatchAction('logout')
    }
  }
  
  render() {    
    return(
      <div className="sidebar">
        <p className='logged-in-as'>Logged in as {this.props.user.email}</p>
        <nav className='sidebar__nav'>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/workouts'>Workouts</Link></li>
            <li><Link to='/workouts/new'>New Workout</Link></li>
            <li><Link to='/logout' onClick={this.logOut}>Logout</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({dispatchAction: $R_Auth.dispatchAction}, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SideBar);