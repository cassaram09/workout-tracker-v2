/* For testing purposes only. */

import request from 'superagent';

class Resource {
  constructor(options){
    const { name, url, headers, state } = options

    if ( !name ) {
      throw("Name is required when creating a new Resource.")
    }

    this.name = name.toUpperCase();
    this.url = url;
    this.headers = headers;
    this.prefix = name.toUpperCase() + '_';
    this.state = {data: state || [], errors:[]}

    this.reducerActions = {}
    this.resourceActions = {};

    /* 
     * Generic reducer action that accepts our initial state and the action
     * object. The function checks to see if the action type is one of the 
     * current Resource's listed reducer actions - if so, execute that
     * reducer action (etiher a default or custom action).
    */
    this.reducer = (state = this.state, action) => {
      if ( this.reducerActions[action.type] ) {
        return this.reducerActions[action.type](state, action);
      }
      return state;
    }

    /*
     * Add special error handlers to our resource.
    */
    this.addReducerAction('$ERROR',(state, action) =>{
      return {data: state.data, errors: [action.data]}
    })

    this.addReducerAction('$CLEAR_ERRORS',(state, action) =>{
      return {data: state.data, errors: []}
    })

  }
}

/*  
 * Enable our resource to use our Store's dispatch function.
*/
Resource.configure = function({dispatch}){
  var this2 = this;
  this2.prototype.dispatch = dispatch;
}

/*  
 * Dispatch an asynchronous action to our store.
 *
 * Accepts the name of the action we want to exectute, plus a data object.
 * Find the action, prefixed by the resource name (to prevent conflicts),
 * then execute it. If the request is successful, return a
 * dispatch function with the type set to the prefixed action name, plus
 * the response data.
*/
Resource.prototype.dispatchAsync = function(actionName, data) {

  const name = this.prefix + actionName.toUpperCase();

  return this.resourceActions[name](data).then( response => {
    if ( !response.ok){
      throw( response )
    }
    this.dispatch({type: name, data: response.body});
  }).catch(error => {
    this.dispatch({type: this.prefix + '$ERROR', data: error.body});
  })
}

/* 
 * Dispatch a synchronous action to our store.
*/
Resource.prototype.dispatchSync = function(actionName, data) {
  const name = this.prefix + actionName.toUpperCase();
  this.dispatch({type: name, data: data});
}

/*
 * Register a custom resource action and reducer action. This accepts any
 * promise based function as a resource function.
*/
Resource.prototype.registerNewAction = function(options) {
  const { name, url, method, reducerFn, resourceFn } = options

  if ( !name || !reducerFn ) {
    throw("Name and Reducer function are required when registering a new action.")
  }

  this.addResourceAction({name, url, method, resourceFn});
  this.addReducerAction(name, reducerFn);
  return this;
}

/* 
 * Create a new resource action, which are used to perform an action, such as 
 * requesting a resource from a server. However, we can also pass non remote 
 * action, as long as it uses a Promise.
*/ 
Resource.prototype.addResourceAction = function(options) {
  const { name, url, method, resourceFn } = options

  if ( !name ) {
    throw("Name is required when adding a resource action.")
  }

  const actionName = this.prefix + name.toUpperCase();

  // Use a resourceFN if available, else use default resource action
  if ( resourceFn ) {
    this.resourceActions[actionName] = resourceFn
  } else {
    this.resourceActions[actionName] = (data) => {
      return this.fetchRequest(url, method, data, this.headers);
    };
  }

  return this;
}

/* 
 * Adds a new reducer action to our Resource's reducer.  
*/ 
Resource.prototype.addReducerAction = function(name, reducerFn) {
  if (!name || !reducerFn){
    throw("Name and Reducer function are required.")
  }
  const actionName = this.prefix +  name.toUpperCase();
  this.reducerActions[actionName] = this.reducerActions[actionName] || reducerFn;
  return this;
}

/* 
 * Update/overwrrite a reducer action (such as a default reducer action)  
*/ 
Resource.prototype.updateReducerAction = function(name, reducerFn) {
  if (!name || !reducerFn){
    throw("Name and Reducer function are required.")
  }
  const actionName = this.prefix +  name.toUpperCase();
  this.reducerActions[actionName] = reducerFn;
  return this;
}

/* 
 * Update/overwrrite a resource action (such as a default resource action) 
*/ 
Resource.prototype.updateResourceAction = function(name, resourceFn) {
  if (!name || !resourceFn ){
    throw("Name and Resource function are required.")
  }
  const actionName = this.prefix + name.toUpperCase();
  this.reducerActions[actionName] = resourceFn;
  return this;
}

/*
 * Registers the default remote resouce action/reducers for CRUD operations: 
 * query(index), get(individual resource), create, update, and delete.
*/
Resource.prototype.registerRemoteActions = function() { 
  for ( let action in this.remoteActions) {
    const name = '$' + action.toUpperCase()
    const url = this.url + this.remoteActions[action].url;
    const method = this.remoteActions[action].method;
    const reducerFn =  this.remoteActions[action].reducerFn
    this.registerNewAction({name, url, method, reducerFn})
  }
  return this;
}

/*
 * Dynamically creates requests to a remote endpoint.
*/
Resource.prototype.fetchRequest = function(url, method, body, headers) {
  return new Promise( (resolve, reject) => {
    /* 
     * If we set URL params, let's automatically match the a key to them.
     * eg /api/v1/widgets/:id, search through our object to find an ID
     * If we're dealing with a widget resource, it should be in the top level
    */
    const urlParams = url.match(/:(\w+)/ig)

    if (urlParams) {
      for ( let param of urlParams ){
        url = url.replace(param, findValueByKey(body, param.substring(1)))
      }
    }

    if ( method == 'GET' ) {
      request(method, url)
      .query(body)
      .set(headers)
      .end( (error, response) => {
        resolve(response)
      })
      return
    }

    if (method == 'POST' || method == 'PATCH' || method == 'PUT' || method == 'DELETE' ) {
      request(method, url)
      .send(body)
      .set(headers)
      .end( (error, response) => {
        resolve(response)
      })
      return
    }

    reject('Invalid request.')
  })
}

/* 
 * Use this to find the right value for param matching
*/
function findValueByKey(obj, key){
  for (let prop in obj) {
    return key === prop ? obj[prop] : findValueByKey(obj[prop], key)
  }
  return null;
}

/* 
 * Generic function for removing a piece of data from our store.
*/
function removeData(state, action){
  const newState = Object.assign([], state.data);
  const indexToDelete = state.data.findIndex(exercise => {
    return exercise.id == action.data.id
  })
  newState.splice(indexToDelete, 1);
  return {data: newState, errors: state.errors}
}

/* 
 * Generic function for adding a piece of data to our store.
*/
function addData(state, action){
  return {data: [ ...state.data.filter(element => element.id !== action.data.id), Object.assign({}, action.data)], errors: state.errors}
}

Resource.prototype.remoteActions = {
  query: {
    method: 'GET',
    url: '',
    reducerFn: (state, action) => { return {data: action.data, errors: [...state.errors]} },
  },
  get: {
    method: 'GET',
    url: '/:id',
    reducerFn: (state, action) => { return addData(state, action) },
  },
  create: {
    method: 'POST',
    url: '',
    reducerFn: (state, action) => { return addData(state, action) },
  },
  update: {
    method: 'PATCH',
    url: '/:id',
    reducerFn: (state, action) => { return addData(state, action) },
  },
  delete: {
    method: 'DELETE',
    url: '/:id',
    reducerFn: (state, action) => { return removeData(state, action) },
  }
}

export default Resource;
