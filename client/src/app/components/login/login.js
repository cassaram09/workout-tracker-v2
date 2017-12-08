import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import {Motorcycle} from '/src/app/utils/constants'


import $R_Auth from '/src/app/utils/auth';

class Login extends Component {
  constructor(){
    super()

    this.state={
      user: {
        email: '',
        password: ''
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
      this.props.actions.dispatchAction('login', this.state);
    }
  }

  // return the form
  render(){
    return(
      <div className='login' style={{background: `url(${Motorcycle}) center center no-repeat`, backgroundSize: 'cover'}}>
        <form className='login__form' onSubmit={this.onSave} >
          <div className='field-group'>
            <label className='label' htmlFor='email'>Email</label>
            <input className='login__form__email' type='text'  onChange={this.onChange} name='email'/>
          </div>
          <div className='field-group'>
            <label className='label' htmlFor='password'>Password</label>
            <input className='login__form__password' type='password' onChange={this.onChange} name='password'/>
          </div>
          <div className='field-group'>
            <button className='button login__form__submit 'type='submit'>Login</button>
          </div>
        </form>
        <div className='login__sign-up-link'>
         <Link to='/signup'>Don't have an account? Sign up</Link>
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

export default connect(null, mapDispatchToProps)(Login);



