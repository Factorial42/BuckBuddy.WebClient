export const login = (username, password) => {
  return {
    type: 'LOGIN',
    username,
    password
  }
}
