const API = {
  base: '/api/v1',
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json, */*',
    'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
  } 
}

export default API;
