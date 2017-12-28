import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Barbell } from '/src/app/utils/constants'
import {connect} from 'react-redux';

import $R_Auth from '/src/app/utils/auth';

class Login extends Component {
  constructor(){
    super()

    this.state = {
      user: {
        email: '',
        password: ''
      }
    }

    this.onChange = (event) =>{
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value
      this.setState({user: user})
    }

    this.onSave = (event) => {
      event.preventDefault();
      if ( !this.state.user.email || !this.state.user.password ) {
        return $R_Auth.throwError({title:'Incorrect login', detail: 'Email and password are required'})
      }
      return $R_Auth.dispatchAction('login', this.state)
    }
  }

  componentWillUnmount(){
    $R_Auth.clearErrors();
  }
  
  render(){
    var errors;
    if ( this.props.authErrors.length > 0 ) {
      errors = this.props.authErrors.map( (error,index) => {
        return ( <p className='login__error__details' key={index}>{error.title}: {error.detail}</p> )
      })
    }

    return(
      <div className='login' style={{background: `url(${Barbell}) center center no-repeat`, backgroundSize: 'cover'}}>
        <div className='container'>

          <div className='row'>
            <div className='col-5'>
              <h1 className='login__title'>Join the fitness revolution</h1>
              <p className='login__subtitle'>The world's first workout tracker, built with React and Redux. Get those gains.</p>
            </div>

            <div className='col-2'>
            </div>

            <div className='col-5'>
              <div className='login__error'>{errors}</div>
              <form className='login__form' onSubmit={this.onSave} >
                <div className='field-group'>
                  <input placeholder='Email' className='login__form__email' type='text'  onChange={this.onChange} name='email'/>
                </div>
                <div className='field-group'>
                  <input placeholder='Password' className='login__form__password' type='password' onChange={this.onChange} name='password'/>
                </div>
                <div className='field-group'>
                  <button className='button login__form__submit' type='submit'>Login</button>
                </div>
              </form>

              <div className='login__sign-up-link'>
               <Link to='/signup'>Don't have an account? Sign up here</Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => { 
  return {
    authData: state.auth.data,
    authErrors: state.auth.errors,
  }
};

export default connect(mapStateToProps)(Login);
