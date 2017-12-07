import {combineReducers} from 'redux';

import $R_Auth from '/src/app/utils/auth'
import $R_User from '/src/app/utils/user'


const rootReducer = combineReducers({
  user: $R_User.reducer,
  session: $R_Auth.reducer,
})

export default rootReducer;