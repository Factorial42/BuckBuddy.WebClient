import axios from 'axios'

export function login(credentials) {
  //Req: curl -i -XPOST 'localhost:4567/users/login' -d '{"email":"test1@buckbuddy.com", "password":"test"}'
  return axios.post('/api/users/login', credentials)
    .then(res => res.data.data);

}

export function loginFb(token) {
  //Req: curl -i -XPOST 'localhost:4567/users/fb/login?code=AQCMvR6DltrmRi_s0Y1pOn4IziTTdy-Ani5r8fmxtFBJLHrDllLhK5SExESgi9DQEIZOpaHifatI5vq0UiyyMtdeNMWGPtAbAbQ3CC6TLm0v05D9JWF4cK8r8Hm2_Wta5x_PrSPHiFNRltUCIvn9-xO4DcaDl5NwIcxtkF24bX3-A0qkGlFRIotcILp6vouhp5ydw6VWmdnD2yl43GZVfhNhXRwnfgv8b1owp8M39Z1a4TTsqWJ7YbG0wP0Jpw2YvEyTijsZA1qXZs3IsPC7CKnLmRStvKLDcEKnCSH7Om899kh_lpgFbbw9yIOhdckaE55BruDqxM9726vnlFDQFcjjM8SsYabzjdFOly-uCFOA'
  //
  return axios.post(`/api/users/fb/login?fbToken=${token}`)
    .then(res => res.data.data);

}

export function signup(userData) {

  return axios.post('/api/users/signup', userData)
    .then(res => res.data.data);
}

export function signupFb(userData) {
  return axios.post('/api/users/fb/signup', userData)
    .then(res => res.data.data);
}

export function getUser() {

}

export function getFbProfile(token) {

  //Req: curl -i -XGET 'localhost:4567/users/fb/profile?code=AQBVwziF2tuwnvRu0J9ypm0ld70o0sAjpJUUwhcNCBW_Gq6tNpeh9iQ9on8XSVlgmbkx0BfEuXHs2qC3v6v8mx7SQcYTGRSIAJfvTnOD4iYGjxe7xaqALudRrQzITD_yDVfstskrpm_oyfYFvRttEqGkZIDPp56MoD7Rfge2CPCZInJlRdYup-aNqTs3P40w4zsm_RZKVWdVVoMJnI0KBS1j7Wy4Il2CjQEGVXtpktbaCaECHBiePDab889gliyw3Dq87WzlUNteCFcG_WPeEkUCHx9TTSFwFdTf28Io7t2elmzx_A6t_f_bUHFuzoyOST5oMUA0G51e0P6xOxiO022yrvOSU2sTqc13ZRLXgrXJFQ'

  return axios.get(`/api/users/fb/profile?fbToken=${token}`)
    .then(res => res.data.data);

}
