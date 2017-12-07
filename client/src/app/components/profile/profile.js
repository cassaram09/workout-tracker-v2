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

    this.updateField = (event) => {
      var user = deepClone(this.state.user)
      var field = event.target.name
      var value = event.target.value
      user[field] = value
      this.setState({user: user})
    }

    this.save = () => {
      var state = deepClone(this.state)
      this.props.actions.dispatchAction('update', state).then((response) =>{
        alert('updated')
      })
    }

  }

  componentWillReceiveProps(nextProps){
    if ( nextProps.user.id ){
      this.setState({user: nextProps.user})
    }
  }

  render(){

    var {name, email, height, weight, age, gender, drinker, avatar} = this.state.user;



      return (
        <div className='page profile'>
          <h1>Profile</h1>
          <div className='field-group'>
            <label>Sex</label><br/>
            <input type='radio' checked={gender == 'male' ? true : false} name="gender" value='male' onChange={this.updateField}/>Male
            <input type='radio' checked={gender == 'female' ? true : false} name="gender" value='female' onChange={this.updateField}/>Female
          </div>

          <div className='field-group'>
            <label>Drinker</label>
            <input type='checkbox' checked={drinker ? true : false} name="drinker" value='true' onChange={this.updateField}/>
          </div>

           <div className='field-group'>
            <label>Name</label>
            <input type='text' name="name" value={name} onChange={this.updateField}/>
          </div>

          <div className='field-group'>
            <label>Email</label>
            <input type='text' name="email" value={email} onChange={this.updateField}/>
          </div>

           <div className='field-group'>
            <input
              type="submit"
              className="button"
              onClick={this.save}
            />
          </div>
        </div>
      )
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
