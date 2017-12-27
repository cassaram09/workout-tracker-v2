import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import Main from '/src/app/components/main/main';
import Login from '/src/app/components/login/login';
import SignUp from '/src/app/components/signUp/signUp';
import SideBar from '/src/app/components/sideBar/sideBar';

import $R_User from '/src/app/utils/user';

class App extends Component {

  componentWillMount(){
    if (this.props.session == true) {
      $R_User.dispatchAction('getCurrentUser')
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.session == true && !this.props.user.id) {
      $R_User.dispatchAction('getCurrentUser')
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
          <div className='header'>
            <div className='container'>
              <h1 className='app__title'>YourFitnessFriend</h1>
            </div>
          </div>

          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>

          <div className='footer'>
            <div className='container'>
              <p>Copyright Matt Cassara 2017.</p>
            </div>
          </div>
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