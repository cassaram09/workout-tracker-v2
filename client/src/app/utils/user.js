import Resource from 'r3-library';
import API from '/src/app/utils/api';

const User = new Resource('user', API.base + '/users', API.headers)
  .configureState({})
  .registerNewAction(API.base + '/current-user', 'getCurrentUser', 'GET', (state, action) => {

    return action.data 
  })
  .addReducerAction('update', (state, action) => action.data)
  .addResourceAction('/users', 'update', 'PATCH')


export default User;
