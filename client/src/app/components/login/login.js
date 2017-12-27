import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Barbell } from '/src/app/utils/constants'

import $R_Auth from '/src/app/utils/auth';
import Store from '/src/app/store/store'

class Login extends Component {
  constructor(){
    super()

    this.state={
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
      return $R_Auth.dispatchAction('login', this.state)
    }
  }

  render(){
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
              <form className='login__form' onSubmit={this.onSave} >
                <div className='field-group'>
                  <input placeholder='Email' className='login__form__email' type='text'  onChange={this.onChange} name='email'/>
                </div>
                <div className='field-group'>
                  <input placeholder='Password' className='login__form__password' type='password' onChange={this.onChange} name='password'/>
                </div>
                <div className='field-group'>
                  <button className='button login__form__submit -light' type='submit'>Login</button>
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

export default Login;
