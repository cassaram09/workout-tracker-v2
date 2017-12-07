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
      var user = Object.assign({}, this.props.user)
      var field = event.target.name
      var value = event.target.value
      user[field] = value
      this.setState(user)
    }

    this.save = () => {
      var state = deepClone(this.state)
      this.props.actions.dispatchAction('update', state).then((response) =>{
        alert('updated')
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
          <div className='field-group'>
            <label>Sex</label><br/>
            <input type='radio' checked={gender == 'male' ? true : false} name="gender" value='male' onChange={this.updateField}/>Male
            <input type='radio' checked={gender == 'female' ? true : false} name="gender" value='female' onChange={this.updateField}/>Female
          </div>

          <div className='field-group'>
            <label>Drinker</label>
            <input type='checkbox' checked={true} name="drinker" value='true' onChange={this.updateField}/>
          </div>

           <div class='field-group'>
            <input
              type="submit"
              className="btn btn-primary"
              onClick={this.save}
            />
          </div>
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
