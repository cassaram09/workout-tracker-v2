import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import { Barbell } from '/src/app/utils/constants'

import $R_Auth from '/src/app/utils/auth';

class SignUp extends Component {
  constructor(){
    super()

    this.state={
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }

    // handle field changes
    this.onChange = (event) =>{
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value
      this.setState({user: user})
    }

    // dispatches the API call action
    this.onSave = (event) => {
      event.preventDefault();
      this.props.actions.dispatchAction('signUp', this.state);
    }
  }

  // return the form
  render(){
    return(
      <div className='sign-up' style={{background: `url(${Barbell}) center center no-repeat`, backgroundSize: 'cover'}}>
        <form className='sign-up__form' onSubmit={this.onSave} >
          <div className='field-group'>
            <label className='label' htmlFor='name'>Name</label>
            <input className='sign-up__form__name' type='text'  onChange={this.onChange} name='name'/>
          </div>
          <div className='field-group'>
            <label className='label' htmlFor='email'>Email</label>
            <input className='sign-up__form__email' type='text'  onChange={this.onChange} name='email'/>
          </div>
          <div className='field-group'>
            <label className='label' htmlFor='password'>Password</label>
            <input className='sign-up__form__password' type='password' onChange={this.onChange} name='password'/>
          </div>
          <div className='field-group'>
            <label className='label' htmlFor='password'>Confirm Password</label>
            <input className='sign-up__form__password-confirmation' type='password' onChange={this.onChange} name='password_confirmation'/>
          </div>
          <div className='field-group'>
            <button className='button sign-up__form__submit 'type='submit'>SignUp</button>
          </div>
        </form>

        <div className='login__sign-up-link'>
          <Link to='/'>Back to login</Link>
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({dispatchAction: $R_Auth.dispatchAction}, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SignUp);



