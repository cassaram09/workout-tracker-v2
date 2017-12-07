import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 

import $R_User from '/src/app/utils/user'
import { deepClone } from '/src/app/utils/tools'


class Profile extends Component {
  constructor(props){
    super(props) 

    this.state = {
      user: this.props.user,
    }

    this.update = (user) => {
      var state = deepClone(this.state)
      state.user = user;
      return this.setState(state)
    }

    this.toggleAlert = () =>{
      return this.setState({show: true})
    }

    this.save = () => {
      var state = deepClone(this.state)
      delete state.user.avatar;
      this.props.actions.dispatchAction('update', state).then((response) =>{
        this.toggleAlert()
      })
    }

  }

  componentWillReceiveProps(nextProps) {
    return this.setState({user: nextProps.user});
  }

  render(){

    var {name, email, height, weight, age, gender, avatar} = this.state.user;

    if ( !this.state.editing ){
      return (
        <div className='page profile'>
          <h1>Profile</h1>
        </div>
      )
    } 
  }

}

Profile.propTypes = {

}

function mapStateToProps(state, ownProps) { 
  return {user: state.user};
};

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({dispatchAction: $R_User.dispatchAction}, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
