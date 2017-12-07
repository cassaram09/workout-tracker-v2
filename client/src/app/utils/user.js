import Resource from '/src/app/utils/resource';
import history from '/src/app/utils/history'
import API from '/src/app/utils/api';

const User = new Resource({
  name: 'user', 
  url:  API.base + '/users', 
  headers: API.headers, 
  state: {} 
})

// fetches data for the current user
User.registerNewAction({
  name: 'getCurrentUser', 
  url: API.base + '/current-user', 
  method: 'GET', 
  reducerFn: ( (state, action) => action.data ) 
})

// updates data for the current user, returns updated user
User.registerNewAction({
  name: 'update', 
  url: User.url, 
  method: 'PATCH', 
  reducerFn: ( (state, action) => action.data ) 
})

export default User;
