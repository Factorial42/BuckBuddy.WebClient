import axios from 'axios'

export function login(credentials) {
  //Req: curl -i -XPOST 'localhost:4567/users/login' -d '{"email":"test1@buckbuddy.com", "password":"test"}'
  return axios.post('/api/users/login', credentials)
    .then(res => res.data.data);

}

export function signup(userData) {

  return axios.post('/api/users/signup', userData)
    .then(res => res.data.data);
}

export function signupFb(name, email) {

/**
 * Todo...wait until this is updated by jay...
 */
  let payload = {
    email,
    firstName: name,
    lastName: name
  }

  return axios.post('/api/users/fb/signup', userData)
    .then(res => res.data.data);
}

export function getUser() {

}
