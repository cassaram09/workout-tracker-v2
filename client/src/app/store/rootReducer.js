import {combineReducers} from 'redux';

import $R_Auth from '/src/app/utils/auth'

const rootReducer = combineReducers({
  session: $R_Auth.reducer,
})

export default rootReducer;