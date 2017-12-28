import Resource from '/src/app/utils/resource'
import API from '/src/app/utils/api';
import request from 'superagent';

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
  reducerFn: ( (state, action) => { 
    return { data: action.data, errors: [...state.errors] } 
  }) 
})

// updates data for the current user, returns updated user
User.registerNewAction({
  name: 'update', 
  url: User.url + '/:id', 
  method: 'PATCH', 
  reducerFn: ( (state, action) => { 
    return { data: action.data, errors: [...state.errors] } 
  }) 
})

// handle image upload
const uploadImageAction = (data) => {
  return new Promise((resolve, reject) => {
    const req = request.patch(User.url + '/' + data.id).set('AUTHORIZATION', `Bearer ${sessionStorage.jwt}`)
      req.attach('user[avatar]', data.file);
      req.end(function(error, response){
        resolve(response.body);
      });
  });
}

User.registerNewAction({
  name: 'UPLOAD_IMAGE', 
  url: User.url + '/:id', 
  method: 'PATCH', 
  resourceFn: uploadImageAction,
  reducerFn: ( (state, action) => { 
    return { data: action.data, errors: [...state.errors] } 
  }) 
})

export default User;
