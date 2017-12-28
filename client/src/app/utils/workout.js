import Resource from '/src/app/utils/resource'
import API from '/src/app/utils/api';
import history from '/src/app/utils/history'

const Workout = new Resource({
  name: 'workout', 
  url:  API.base + '/workouts', 
  headers: API.headers
})

Workout.registerRemoteActions();

Workout.updateReducerAction('$CREATE', (state, action) => {
  history.push(`/workouts/${action.data.id}`)
  return {data: [ ...state.data.filter(element => element.id !== action.data.id), Object.assign({}, action.data)], errors: [...state.errors]}
})

Workout.updateReducerAction('$DELETE', (state, action) => {
  history.push(`/workouts`)
  const newState = Object.assign([], state.data);
  const indexToDelete = state.data.findIndex(exercise => {
    return exercise.id == action.data.id
  })
  newState.splice(indexToDelete, 1);
  return {data: newState, errors: [...state.errors]};
})


export default Workout;