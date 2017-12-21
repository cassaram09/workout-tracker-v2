import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'

import Store from '/src/app/store/store';  
import $R_Auth from '/src/app/utils/auth';
import Avatar from '/src/app/components/avatar/avatar'

class SideBar extends Component {
  constructor(props){
    super(props)

    this.logOut = (event) => {
      event.preventDefault();
      return $R_Auth.dispatchAction('logout')
    }

    this.activeNavLink = (match, location) => {
      if (!match){
        return false;
      }
      return match.path == location.pathname
    }
  }
  
  shouldComponentUpdate(){
    return true;
  }

  render() {    
    return(
      <div className="sidebar">
        <h4 className='sidebar__title'>My Fitness Friend</h4>
        <Avatar type='sidebar__avatar'/>
        <nav className='sidebar__nav'>
          <ul>
            <li><NavLink isActive={this.activeNavLink} activeClass='activeLink' to='/'>Home</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeClass='activeLink' to='/profile'>Profile</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeClass='activeLink' to='/workouts'>Workouts</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeClass='activeLink' to='/workouts/new'>New Workout</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeClass='activeLink' to='/logout' onClick={this.logOut}>Logout</NavLink></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(SideBar);