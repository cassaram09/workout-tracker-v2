import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Barbell } from '/src/app/utils/constants'


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
      <div className='login' style={{background: `url(${Barbell}) center center no-repeat`, backgroundSize: 'cover'}}>
        <div className='container'>
          <div className='row'>
            <div className='col-5'>
              <h1>Join the fitness revolution</h1>
              <p>The world's first workout tracker, built with React and Redux. Get those gains.</p>
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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({dispatchAction: $R_Auth.dispatchAction}, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Login);



