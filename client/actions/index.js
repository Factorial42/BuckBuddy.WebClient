export const login = (username, password) => {
  return {
    type: 'LOGIN',
    username,
    password
  }
}

export const signup = (name, username, password) => {
  return {
    type: 'SIGNUP',
    name,
    username,
    password
  }
}
