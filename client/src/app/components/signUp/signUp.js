import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import { Barbell } from '/src/app/utils/constants'
import $R_Auth from '/src/app/utils/auth';
import {connect} from 'react-redux';


class SignUp extends Component {
  constructor(){
    super()

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }

    this.onChange = event =>{
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value
      this.setState({user: user})
    }

    this.onSave = event => {
      event.preventDefault();
      if ( !this.state.user.email || !this.state.user.name || !this.state.user.password || !this.state.user.password_confirmation ) {
        return $R_Auth.dispatchSync('$ERROR', {title:'Invalid signup', detail: 'All fields are required'})
      }
      return $R_Auth.dispatchAsync('SIGNUP', this.state)
    }
  }

  componentWillUnmount(){
    $R_Auth.dispatchSync('$CLEAR_ERRORS');
  }

  render(){
    var errors;
    if ( this.props.authErrors.length > 0 ) {
      errors = this.props.authErrors.map( (error,index) => {
        return ( <p className='login__error__details' key={index}>{error.title}: {error.detail}</p> )
      })
    }

    return(
      <div className='sign-up' style={{background: `url(${Barbell}) center center no-repeat`, backgroundSize: 'cover'}}>
         <div className='login__error'>{errors}</div>
        <form className='sign-up__form' onSubmit={this.onSave} >
          <div className='field-group'>
            <label className='field-group__label' htmlFor='name'>Name</label>
            <input className='sign-up__form__name' type='text'  onChange={this.onChange} name='name'/>
          </div>
          <div className='field-group'>
            <label className='field-group__label' htmlFor='email'>Email</label>
            <input className='sign-up__form__email' type='text'  onChange={this.onChange} name='email'/>
          </div>
          <div className='field-group'>
            <label className='field-group__label' htmlFor='password'>Password</label>
            <input className='sign-up__form__password' type='password' onChange={this.onChange} name='password'/>
          </div>
          <div className='field-group'>
            <label className='field-group__label' htmlFor='password'>Confirm Password</label>
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

const mapStateToProps = (state, ownProps) => { 
  return {
    authErrors: state.auth.errors,
  }
};

export default connect(mapStateToProps)(SignUp);
