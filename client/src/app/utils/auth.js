import Resource from '/src/app/utils/resource'
import {browserRouter} from 'react-router-dom'
import history from '/src/app/utils/history'
import API from '/src/app/utils/api';

const state = {session: !!sessionStorage.jwt}
const headers = {'Content-Type': "application/json"}

const Auth = new Resource({name: 'auth', url: '', headers: headers, state: state})

//login action
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

//sign up action
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

// logout resource action
const logOutAction = () => {
  return new Promise((resolve, reject) => {
    sessionStorage.removeItem('jwt');
    if ( !sessionStorage.jwt ) {
      resolve(!!sessionStorage.jwt)
    } else {
      reject(Error("Error"));
    }
  });
}

// logout Reducer fn
const logOutReducer = (state, action) => {
  if ( !action.data ) {
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

Auth.registerNewAction({
  name: 'login', 
  url: '/login', 
  method: 'POST', 
  reducerFn: loginReducer
})

Auth.registerNewAction({
  name: 'signUp', 
  url: '/signup', 
  method: 'POST', 
  reducerFn: signUpReducer
})

Auth.registerNewAction({
  name: 'logout', 
  url: '/logout', 
  method: 'POST',
  resourceFn: logOutAction, 
  reducerFn: logOutReducer
})

export default Auth;
