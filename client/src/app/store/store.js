import { createStore, applyMiddleware } from 'redux'
import rootReducer from '/src/app/store/rootReducer'
import thunk from 'redux-thunk'

// configure our store to use our combined reducer and apply the Thunk Middleware
function configureStore(){
  return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
};

export default configureStore();