class HTTP {
  constructor(){}

  static createRequest(url, method, body, headers) {

    var urlParams = url.match(/:(\w+)/ig)

    if (urlParams) {
      for ( let param of urlParams ){
        url = url.replace(param, HTTP.findValueByKey(body, param.substring(1)))
      }
    }

    // Not permitted to send a body with GET/HEAD requests
    if (body && method != 'GET'){
      body = JSON.stringify(body);
    } else {
      body = undefined;
    }

    var request = new Request(url, {
      method: method,
      headers: new Headers(headers),
      body: body
    });

    return request;
  }

  static fetchRequest(request){
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    })
  }

  static post(url, data, headers){
    var request = HTTP.createRequest(url, 'POST', data, headers);
    return HTTP.fetchRequest(request)
  }

  static get(url, data, headers){
    var request = HTTP.createRequest(url, 'GET', data, headers);
    return HTTP.fetchRequest(request)
  }

  static patch(url, data, headers){
    var request = HTTP.createRequest(url, 'PATCH', data, headers);
    return HTTP.fetchRequest(request)
  }

  static delete(url, data, headers){
    var request = HTTP.createRequest(url, 'DELETE', data, headers);
    return HTTP.fetchRequest(request)
  }

  static findValueByKey(obj, key){
    var match;
    for (var prop in obj) {
      if (key === prop) {
        return obj[prop]
      } else{
        return HTTP.findValueByKey(obj[prop], key)
      }
    }
    return null;
  }

}

function removeData(state, action){
  const newState = Object.assign([], state);
  const indexToDelete = state.findIndex(exercise => {
    return exercise.id == action.data.id
  })
  newState.splice(indexToDelete, 1);
  return newState;
}

function addData(state, action){
  return [ ...state.filter(element => element.id !== action.data.id), Object.assign({}, action.data)]
}

const Defaults = {
  query: {
    method: 'GET',
    url: '',
    reducerFn: (state, action) => { return action.data },
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


class Resource extends HTTP {
  constructor(options){
    const { name, url, headers, state } = options

    super();

    //  set the name, base url, and headers for this instance
    if ( !name ) {
      throw("Name is required when creating a new Resource.")
    }

    this.name = name;
    this.url = url;
    this.headers = headers;
    this.prefix = name + '_';
    this.state = state || []

    //  declare our reducer and resource action holders
    this.reducerActions = {};
    this.resourceActions = {};


    /*  
        Generic dispatch action that accepts the name of the action we want
        to exectute, plus any data, passed as an object. Find the action,
        prefixed by the resource name (to prevent conflicts), then execute
        the request to the server. If the request is successful, return a
        dispatch function with the type set to the prefixed action name, plus
        the response data.
    */
    this.dispatchAction = (action, data) => {
      const name = this.prefix + action;
      return (dispatch) => {
        return this.resourceActions[name](data).then( response => {
          dispatch({type: name, data: response});
        }).catch(error => {
          throw(error);
        })
      }
    }

    this.setState = (newState) => {
      this.state = newState;
      return this;
    }
    /* 
        Generic reducer action that accepts our initial state and the action
        object. The function checks to see if the action type is one of the 
        current Resource's listed reducer actions - if so, execute that
        reducer action (etiher a default or custom action).
    */
    this.reducer = (state = this.state, action) => {
      if (this.reducerActions[action.type]) {
        return this.reducerActions[action.type](state, action);
      }
      return state;
    }

    //  Register a custom resource action and reducer action. 
    this.registerNewAction = (options) => {
      const { name, url, method, reducerFn, resourceFn } = options

      if ( !name || !url || !method || !reducerFn ) {
        throw("Name, URL, Method, and ReducerFn are required when registering a new action.")
      }

      this.addResourceAction({name, url, method, resourceFn});
      this.addReducerAction(name, reducerFn);
      return this;
    }

    //  create a new resource action (more flexible)
    // Resource functions are used to perform an action, such as requesting a resource from a server. 
    // However, we can also pass non remote action (such as a logout function that clears our sesssion token.)
    this.addResourceAction = (options) => {

      const { name, url, method, resourceFn } = options

      var actionName = this.prefix + name;

      // if we pass a resourceFN, use that, otherwise use default resource Action
      if ( resourceFn ) {
        this.resourceActions[actionName] = resourceFn
      } else {
        this.resourceActions[actionName] = (data) => {
          var request = HTTP.createRequest(url, method, data, this.headers);
          return HTTP.fetchRequest(request);
        };
      }

      return this;
    }

    //  create a new reducer action (more flexible)
    this.addReducerAction = (name, callback) => {
      var actionName = this.prefix + name;
      this.reducerActions[actionName] = this.reducerActions[actionName] || callback;
      return this;
    }

    //  Update/overwrrite a reducer action (such as a default action. 
    // this.updateReducerAction = (name, callback) => {
    //   var actionName = prefix + name;
    //   this.reducerActions[actionName] = callback;
    //   return this;
    // }

    // //  Update/overwrrite a resource action (such as a default action. 
    // this.updateResourceAction = (name, callback) => {
    //   var actionName = prefix + name;
    //   this.reducerActions[actionName] = callback;
    //   return this;
    // }

    /*
        Registers the default action/reducers for CRUD operations: query(index),
        get(individual resource), create, update, and delete.
    */
    this.registerDefaults = () => { 
      for ( let name in Defaults) {
        var url = this.url + Defaults[name].url;
        var method = Defaults[name].method;
        var reducerFn =  Defaults[name].reducerFn
        this.registerNewAction(url, name, method, reducerFn)
      }
      return this;
    }

  }

}

export default Resource;

