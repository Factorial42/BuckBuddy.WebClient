import axios from 'axios'

export function login(credentials) {

  return new Promise((ful, rej) => {

    setTimeout(() => ful({}), 1000)
    //return rej('bad')

  });

  // return axios.post('/api/login', {
  //   payload: {username, password}
  // }).then(res => res.data);

}

export function signup(userData) {

  return new Promise((ful, rej) => {

    //return rej('bad')
    setTimeout(() => ful({}), 1000)

  });

}
