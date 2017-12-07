import Resource from '/src/app/utils/resource';
import API from '/src/app/utils/api';
import history from '/src/app/utils/history'

const Workout = new Resource({
  name: 'workout', 
  url:  API.base + '/workouts', 
  headers: API.headers
})

Workout.registerDefaults();

Workout.updateReducerAction('create', (state, action) => {
  history.push(`/workouts/${action.data.id}`)
  return [ ...state.filter(element => element.id !== action.data.id), Object.assign({}, action.data)]
})

export default Workout;