import axios from 'axios'
import fileHelper from './fileHelper'

export function login(credentials) {
  return axios.post('/api-user/users/login', credentials)
    .then(res => res.data.data);

}

export function loginFb(token) {
  return axios.post(`/api-user/users/fb/login?fbToken=${token}`)
    .then(res => res.data.data);
}

export function activate(token) {
  return axios.patch(`/api-user/users/${token}/activate`)
    .then(res => res.data.data);
}

export function signup(userData) {

  return axios.post('/api-user/users/signup', userData)
    .then(res => res.data.data);
}

export function signupFb(userData) {
  return axios.post('/api-user/users/fb/signup', userData)
    .then(res => res.data.data);
}

export function get(id) {
  return axios.get(`/api-user/users/${id}`)
    .then(res => res.data.data);
}

export function getUserByToken(accessToken) {

  //curl -XGET 'localhost:4567/users/byToken/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMzYzNGI5MTU0MzgwMmZmYjYxMzk1ZDkxYTgzYWViYTU0ZTEyMGRiMmZlYmI4ZmFkN2M5YjEzZGViOTcxYTEyIn0.m0BiopdId3pf-mTpIeztMSPBHm41-cYVAY-Qhaj4Q4cEAkPOz4cdJrlr4pAgs9xvtFtre8hr7rNJEo_Jbl1GYg'
  //

  return axios.get(`/api-user/users/byToken/${accessToken}`)
    .then(res => res.data.data);

}

export function updatePhoto(userId, accessToken, file) {
  return fileHelper.upload(
    `/api-user/users/${userId}/uploadProfilePic?token=${accessToken}`,
    file,
    'image')
    .then(res => res.data)
}

export function getFbProfile(fbToken) {

  return axios.get(`/api-user/users/fb/profile?fbToken=${fbToken}`)
    .then(res => res.data.data);

}

export function signupStripe(userId, accessToken, code) {

  //POST 'localhost:4567/users/782159708e9bb3e3af5c9bdf1ff77f70823418d16970eb82fe4d7e1ca5ca69ac/paymentProfile?code=ac_8HN3KMoW6NHdwvCZuWEtBBtbySE8wGeT'
  return axios.post(`/api-user/users/${userId}/paymentProfile?code=${code}&token=${accessToken}`)
    .then(res => res.data.data);

}
