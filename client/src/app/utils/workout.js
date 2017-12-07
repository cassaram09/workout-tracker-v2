import Resource from '/src/app/utils/resource';
import API from '/src/app/utils/api';

const Workout = new Resource({
  name: 'workout', 
  url:  API.base + '/workouts', 
  headers: API.headers
})

Workout.registerDefaults();

export default Workout;