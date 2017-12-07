import {combineReducers} from 'redux';

import $R_Auth from '/src/app/utils/auth'
import $R_User from '/src/app/utils/user'
import $R_Workouts from '/src/app/utils/workout'

const rootReducer = combineReducers({
  workouts: $R_Workouts.reducer,
  user: $R_User.reducer,
  session: $R_Auth.reducer,
})

export default rootReducer;