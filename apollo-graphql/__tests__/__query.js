const { gql } = require('apollo-server-koa');

const signUp = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      status
      message
    }
  }
`
const logIn = gql`
  mutation ($key: LogInKey!, $value: String!, $password: String! ) {
    login (key: $key, value: $value, password: $password) {
      status
      message
    }
  }
`

const refreshToken = gql`
  mutation {
    refreshToken {
      status
      message
    }
  }
`
const getUserInfo = gql`
  query ($username: String!) {
    userInfo(username: $username) {
      username
      email
    }
  }
`
const updateUser = gql`
  mutation ($newInfo: String!) {
    updateUser(newInfo: $newInfo) {
      status
      message
    }
  }
`

const changePassword = gql`
  mutation ($email:String!, $newPassword: String, $cert: String!) {
    changePassword(email:$email, newPassword:$newPassword, cert:$cert) {
      status,
      message
    }
  }
`

const requestEmail = gql`
  mutation ($purpose:String!, $key: String!, $email: String!) {
    requestEmail(purpose: $purpose, key: $key, email: $email) {
      status
      message
    }
  }
`

module.exports = {
  changePassword,
  updateUser,
  refreshToken,
  logIn,
  signUp,
  getUserInfo,
  requestEmail,
}