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

    this.state = {
      showNav: false
    }
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

    this.toggleNav = event => {
      if ( !this.state.showNav ) {
        this.setState({showNav: true})
        document.querySelector('.sidebar__nav.-mobile-body').style.top = '0%'
        for ( let line of document.querySelectorAll('.menu-line') ){
          line.className += ' rotated'
        }
      } else{
        this.setState({showNav: false})
        document.querySelector('.sidebar__nav.-mobile-body').style.top = '-100%'
         for ( let line of document.querySelectorAll('.menu-line') ){
          line.className += 'menu-line'
        }
      }
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
        <nav className='sidebar__nav -mobile ' role="navigation">
          <div id='toggleNav' onClick={this.toggleNav}>
            <span className='menu-line' id='topLine'></span>
            <span className='menu-line' id='middleLine'></span>
            <span className='menu-line' id='bottomLine'></span>
          </div>

          <div className='sidebar__nav -mobile-body'>

            <ul>
              <li><Avatar type='sidebar__avatar -mobile'/></li>
              <li><NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/'>Home</NavLink></li>
              <li><NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/profile'>Profile</NavLink></li>
              <li><NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/workouts'>Workouts</NavLink></li>
              <li><NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/workouts/new'>New Workout</NavLink></li>
              <li><NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/logout' onClick={this.logOut}>Logout</NavLink></li>
            </ul>
          </div>
        </nav>
        <nav className='sidebar__nav'>
          <ul>
            <li><NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/'>Home</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/profile'>Profile</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/workouts'>Workouts</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/workouts/new'>New Workout</NavLink></li>
            <li><NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/logout' onClick={this.logOut}>Logout</NavLink></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(SideBar);