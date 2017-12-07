// import Resource from 'r3-library'
// import API from '../api/api'
// import {browserHistory} from 'react-router'

// var res = Resource;

// const url = ''

// const state = !!sessionStorage.jwt

// const headers = {'Content-Type': "application/json"}

// const Auth = new Resource('auth', url, headers).registerDefaults().configureState(state)

// Auth.registerNewAction(url + '/login', 'login', 'POST', function(state, action){
//   if ( action.data.error ) {
//     console.log(`%c LOGIN UNSUCCESSFUL`, 'color: red')
//     return state
//   }
//   sessionStorage.setItem('jwt', action.data.jwt)
//   browserHistory.push('/');
//   API.headers['AUTHORIZATION']= `Bearer ${action.data.jwt}`
//   console.log(`%c LOGIN SUCCESSFUL`, 'color: blue')
//   return !!sessionStorage.jwt
// })

// Auth.registerNewAction(url + '/signup', 'signup', 'POST', function(state, action){
//   sessionStorage.setItem('jwt', action.data.jwt)
//   browserHistory.push('/');
//   API.headers['AUTHORIZATION']= `Bearer ${action.data.jwt}`
//   console.log(`%c SIGNUP SUCCESSFUL`, 'color: blue')
//   return !!sessionStorage.jwt
// })

// Auth.resourceActions.auth_logout = () => {
//   var promise = new Promise((resolve, reject) => {
//     sessionStorage.removeItem('jwt');
//     !sessionStorage.jwt ? resolve({jwt: 'deleted'}) : reject(Error("Error"));
//   });
//   return promise; 
// }

// Auth.addReducerAction('logout', function(state, action){
//   browserHistory.push('/')
//   console.log(`%c LOGOUT SUCCESSFUL`, 'color: blue')
//   return !!sessionStorage.jwt
// })

// export default Auth;

