import Resource from '/src/app/utils/resource';
import API from '/src/app/utils/api';

const Exercise = new Resource({
  name: 'exercise', 
  url: API.base + '/exercises', 
  headers: API.headers, 
  state: []
})

Exercise.registerRemoteActions()

export default Exercise;

