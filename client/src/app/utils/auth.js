import Resource from '/src/app/utils/resource'
import {browserRouter} from 'react-router-dom'
import history from '/src/app/utils/history'
import API from '/src/app/utils/api';

const Auth = new Resource({
  name: 'auth', 
  url: '', 
  headers: {'Content-Type': "application/json"}, 
  state: {session: !!sessionStorage.jwt}
})

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

Auth.registerAsync({
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

Auth.registerAsync({
  name: 'SIGNUP', 
  url: '/signup', 
  method: 'POST', 
  reducerFn: signUpReducer
})

// Log out reducer (sync action)
Auth.registerSync({
  name: 'LOGOUT',
  reducerFn: (state, action) => {
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
  }
})

export default Auth;
