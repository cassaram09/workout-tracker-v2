import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import $R_Auth from '/src/app/utils/auth';

class HomePage extends Component {
  constructor(props){
    super(props)

    this.logOut = (event) => {
      event.preventDefault();
      this.props.actions.dispatchAction('logout')
    }
  }

  render(){
    return (
      <div className='home'>
        <h1 className='home__title'>Home.</h1>
        <a href='/logout' onClick={this.logOut}>Logout</a>
      </div>
    )
   
  }

}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({dispatchAction: $R_Auth.dispatchAction}, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(HomePage);