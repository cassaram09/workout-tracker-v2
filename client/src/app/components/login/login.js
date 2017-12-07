import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
      <div className='login'>
        <form className='login__form' onSubmit={this.onSave} >
          <label htmlFor='email'>Email</label>
          <input className='login__form__email' type='text'  onChange={this.onChange} name='email'/>
          <label htmlFor='password'>Password</label>
          <input className='login__form__password' type='password' onChange={this.onChange} name='password'/>
          <button className='button login__form__submit 'type='submit'>Login</button>
        </form>
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



