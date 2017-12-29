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
User.registerAsync({
  name: 'GET_CURRENT_USER', 
  url: API.base + '/current-user', 
  method: 'GET', 
  reducerFn: ( (state, action) => { 
    return { data: action.data, errors: [...state.errors] } 
  }) 
})

// updates data for the current user, returns updated user
User.registerAsync({
  name: '$UPDATE', 
  url: User.url + '/:id', 
  method: 'PATCH', 
  reducerFn: ( (state, action) => { 
    return { data: action.data, errors: [...state.errors] } 
  }) 
})

// handle image upload
const uploadImageAction = (data) => {
  return new Promise((resolve, reject) => {
    request
    .patch(`${User.url}/${data.id}`)
    .set('AUTHORIZATION', `Bearer ${sessionStorage.jwt}`)
    .attach('user[avatar]', data.file)
    .end(function(error, response){
      resolve(response);
    });
  });
}

User.registerAsync({
  name: 'UPLOAD_IMAGE', 
  resourceFn: uploadImageAction,
  reducerFn: (state, action) => ( { data: action.data, errors: [...state.errors] } )
})

export default User;
