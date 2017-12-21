import Resource from 'r3-library';
import API from '/src/app/utils/api';

const Exercise = new Resource({
  name: 'exercise', 
  url: API.base + '/exercises', 
  headers: API.headers, 
  state: []
})

Exercise.registerRemoteActions()

export default Exercise;

