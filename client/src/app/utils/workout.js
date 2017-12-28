import Resource from '/src/app/utils/resource'
import API from '/src/app/utils/api';
import history from '/src/app/utils/history'

const Workout = new Resource({
  name: 'workout', 
  url:  API.base + '/workouts', 
  headers: API.headers
})

Workout.registerRemoteActions();

Workout.updateReducerAction('create', (state, action) => {
  history.push(`/workouts/${action.data.id}`)
  return [ ...state.filter(element => element.id !== action.data.id), Object.assign({}, action.data)]
})

Workout.updateReducerAction('delete', (state, action) => {
  history.push(`/workouts`)
  const newState = Object.assign([], state);
  const indexToDelete = state.findIndex(exercise => {
    return exercise.id == action.data.id
  })
  newState.splice(indexToDelete, 1);
  return newState;
})


export default Workout;