import Resource from '/src/app/utils/resource'
import {browserRouter} from 'react-router-dom'
import history from '/src/app/utils/history'
import API from '/src/app/utils/api';

const state = {session: !!sessionStorage.jwt}
const headers = {'Content-Type': "application/json"}

const Auth = new Resource({name: 'auth', url: '', headers: headers, state: state})

// Login reducer and action registration.
const loginReducer = (state, action) => {
  if ( action.data.jwt ) {
    sessionStorage.setItem('jwt', action.data.jwt)
    history.push('/')
    API.headers['AUTHORIZATION']= `Bearer ${action.data.jwt}`
    return {
      data: {
       session: !!sessionStorage.jwt
      },
      errors: state.errors
    }
  }

  return state;
}

Auth.registerNewAction({
  name: 'LOGIN', 
  url: '/login', 
  method: 'POST', 
  reducerFn: loginReducer
})


// Sign up reducer and action registration.
const signUpReducer = (state, action) => {
  if ( action.data.jwt ) {
    sessionStorage.setItem('jwt', action.data.jwt)
    history.push('/')
    API.headers['AUTHORIZATION']= `Bearer ${action.data.jwt}`
    return {
      data: {
       session: !!sessionStorage.jwt
      },
      errors: state.errors
    }
  }

  return state;
}

Auth.registerNewAction({
  name: 'SIGNUP', 
  url: '/signup', 
  method: 'POST', 
  reducerFn: signUpReducer
})

// Log out reducer (sync action)
Auth.addReducerAction('LOGOUT', (state, action) => {
  sessionStorage.removeItem('jwt');
  if ( !sessionStorage.jwt ) {
    history.push('/');
    return {
      data: {
        session: action.data
      },
      errors: []
    }
  }
  return state;
})

export default Auth;
