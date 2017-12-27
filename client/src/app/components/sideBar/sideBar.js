import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom'

import $R_Auth from '/src/app/utils/auth';
import Avatar from '/src/app/components/avatar/avatar'

class SideBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      showNav: false
    }
    this.logOut = event => {
      event.preventDefault();
      if (this.state.showNav){
        this.toggleNav()
      }
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
        document.querySelector('.sidebar__nav.-mobile').style.top = '0%'
        for ( let line of document.querySelectorAll('.sidebar__nav__icon') ){
          line.className += ' rotated'
        }
      } else{
        this.setState({showNav: false})
        document.querySelector('.sidebar__nav.-mobile').style.top = '-100%'
         for ( let line of document.querySelectorAll('.sidebar__nav__icon') ){
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

        <div class='sidebar__nav__toggle' onClick={this.toggleNav}>
          <span className='sidebar__nav__icon -top'></span>
          <span className='sidebar__nav__icon -middle'></span>
          <span className='sidebar__nav__icon -bottom'></span>
        </div>

        <nav className='sidebar__nav -mobile' role="navigation">
          <ul className='sidebar__nav__list -mobile'>
            <li className='sidebar__nav__list__item -mobile'>
              <Avatar type='sidebar__avatar -mobile'/>
            </li>
            <li className='sidebar__nav__list__item -mobile'>
              <NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/'>Home</NavLink>
            </li>
            <li className='sidebar__nav__list__item -mobile'>
              <NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/profile'>Profile</NavLink>
            </li>
            <li className='sidebar__nav__list__item -mobile'>
              <NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/workouts'>Workouts</NavLink>
            </li>
            <li className='sidebar__nav__list__item -mobile'>
              <NavLink isActive={this.activeNavLink} onClick={this.toggleNav} activeclass='activeLink' to='/workouts/new'>New Workout</NavLink>
            </li>
            <li className='sidebar__nav__list__item -mobile'>
              <NavLink isActive={this.activeNavLink} onClick={this.logOut} activeclass='activeLink' to='/logout'>Logout</NavLink>
            </li>
          </ul>
        </nav>

        <nav className='sidebar__nav' role="navigation">
          <ul className='sidebar__nav__list'>
            <li className='sidebar__nav__list__item'>
              <NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/'>Home</NavLink>
            </li>
            <li className='sidebar__nav__list__item'>
              <NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/profile'>Profile</NavLink>
            </li>
            <li className='sidebar__nav__list__item'>
              <NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/workouts'>Workouts</NavLink>
            </li>
            <li className='sidebar__nav__list__item'>
              <NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/workouts/new'>New Workout</NavLink></li>
            <li className='sidebar__nav__list__item'>
              <NavLink isActive={this.activeNavLink} activeclass='activeLink' to='/logout' onClick={this.logOut}>Logout</NavLink>
            </li>
          </ul>
        </nav>

      </div>
    )
  }
}

export default withRouter(SideBar);