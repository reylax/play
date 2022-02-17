require('dotenv').config()
const { startTestServer, setTestClient, toPromise } = require('./__utils')
const jwt = require('jsonwebtoken')
const jwtPrivateKey = process.env.jwtPrivateKey
const { redis } = require('../src/redis')
const {
  changePassword,
  updateUser,
  refreshToken,
  logIn,
  signUp,
  getUserInfo,
  requestEmail,
} = require('./__query')

var executeOperation, conn, httpServer

beforeAll( async () => {
  const testServer = await startTestServer({
    port: 4001,
    databaseName: "common",
  });
  conn = testServer.conn
  httpServer = testServer.httpServer
  executeOperation = setTestClient({port: 4001, token: ""})
});

afterAll( async () => {
  await conn.dropDatabase()
  httpServer.close()
});

describe('sign up', () => {
  test('sign up and wait database create index', async () => {
    const res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "hello",
        email: "sayhimage@outlook.com",
        password: "correctPassword",
      }
    }))
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(res.data).toMatchSnapshot();
    expect(res.data.signUp.status).toBe(201)
  });
  test('with same name', async () => {
    const res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "hello",
        email: "sayhimage@outlookk.com",
        password: "correctPassword",
      }
    }))
    expect(res.data).toMatchSnapshot();
    expect(res.data.signUp.status).toBe(400)
  })
  test('with same email', async () => {
    const res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "halo",
        email: "sayhimage@outlook.com",
        password: "correctPassword",
      }
    }))
    expect(res.data).toMatchSnapshot();
    expect(res.data.signUp.status).toBe(400)
  })
  test('username too long', async () => {
    var res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "q01234567890123456789qqq",
        email: "sayhimage@outlookk.com",
        password: "fjkdfjfklds",
      }}))
      expect(res.data).toMatchSnapshot()
      expect(res.data.signUp.status).toBe(400)
  })
  test('username not start with letter', async () => {
    var res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "01234567890123456789",
        email: "sayhimage@outlookk.com",
        password: "fjkdfjfklds",
      }}))
      expect(res.data).toMatchSnapshot()
      expect(res.data.signUp.status).toBe(400)
  })
  test('username too short ', async () => {
    var res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "U012",
        email: "sayhimage@outlookk.com",
        password: "fjkdfjfklds",
      }}))
      expect(res.data).toMatchSnapshot()
      expect(res.data.signUp.status).toBe(400)
  })
  test('invalid email', async () => {
    var res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "U012",
        email: "sayhimage@outlook.",
        password: "fjkdfjfklds",
      }}))
      expect(res.data).toMatchSnapshot()
      expect(res.data.signUp.status).toBe(400)
  })
})

describe('log in with username', () => {
  test('correct Info', async () => {
    var res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "username",
        value: "hello",
        password: "correctPassword",
      }}))
    var { status, message } = res.data.login
    expect(message).toHaveLength(240)
    const user = jwt.verify(message, jwtPrivateKey)
    expect(user.username).toBe("hello")
    expect(status).toBe(201)
    expect(res.data.login).toMatchSnapshot()
  })
  test('wrong password', async () => {
    res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "username",
        value: "hello",
        password: "wrongPassword",
      }}))
    expect(res.data).toMatchSnapshot()
    expect(res.data.login.status).toBe(400)
  })
  test('bad username', async () => {
    res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "username",
        value: "helloo",
        password: "wrongPassword",
      }}))
    expect(res.data).toMatchSnapshot()
    expect(res.data.login.status).toBe(400)
  }) 
})

describe('log in with email', () => {
  test('correct Info', async () => {
    var res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "email",
        value: "sayhimage@outlook.com",
        password: "correctPassword",
      }}))
    var status = res.data.login.status
    var message = res.data.login.message
    expect(message).toHaveLength(240)
    const user = jwt.verify(message, jwtPrivateKey)
    expect(user.username).toBe("hello")
    expect(status).toBe(201)
    expect(res.data.login).toMatchSnapshot()
  })
  test('wrong password', async () => {
    res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "email",
        value: "sayhimage@outlook.com",
        password: "wrongPassword",
      }}))
    expect(res.data).toMatchSnapshot()
    expect(res.data.login.status).toBe(400)
  })
  test('wrong email', async () => {
    res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "email",
        value: "sayhimage@outloook.com",
        password: "correctPassword",
      }}))
    expect(res.data).toMatchSnapshot()
    expect(res.data.login.status).toBe(400)
  })
})

describe('refresh token', () => {
  var token = ""
  var newToken = ""
  test('login get token', async () => {
    var res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "username",
        value: "hello",
        password: "correctPassword",
      }}))
    var status = res.data.login.status
    token = res.data.login.message
    expect(token).toHaveLength(240)
    var user = jwt.verify(token, jwtPrivateKey)
    expect(user.username).toBe("hello")
    expect(status).toBe(201)
    expect(res.data).toMatchSnapshot()
  })

  test('refresh new token', async () => {
    executeOperation = setTestClient({token: token, port: 4001})
    await new Promise(resolve => setTimeout(resolve, 1000))
    const res = await toPromise(executeOperation({
      query: refreshToken,
    }))
    newToken = res.data.refreshToken.message
    expect(res.data.refreshToken.status).toBe(201)
    expect(newToken).toHaveLength(240)
    expect(newToken === token).toBe(false)
    user = jwt.verify(newToken, jwtPrivateKey)
    expect(user.username).toBe("hello")
    expect(res.data).toMatchSnapshot()
  })

  test('get self only info with new token', async () => {
    executeOperation = setTestClient({token: newToken, port: 4001})
    res = await toPromise(executeOperation({
      query: getUserInfo,
      variables: {
        username: 'hello',
      }
    }))
    expect(res.data.userInfo.email).toBe("sayhimage@outlook.com")
    expect(res.data).toMatchSnapshot()
  })
})

describe('update userInfo', () => {
  var newInfo = {
    username: "newUsername",
    avatar: "avatar",
    backgroundImage: "backgroundImage",
    website: "nah yet",
    bio: "hello world",
    theme: {
      primary: "blueHeart",
      background: "dim",
      language: "english",
    }
  }
  newInfo = JSON.stringify(newInfo)
  test('without login', async () => {
      executeOperation = setTestClient({token: "", port: 4001})
      const res = await toPromise(executeOperation({
        query:updateUser, 
        variables: {
          newInfo,
        }
      }))
      expect(res.data).toMatchSnapshot();
      expect(res.data.updateUser.status).toBe(400)
  })
  test('with login expect seccess', async () => {
    var res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "username",
        value: "hello",
        password: "correctPassword",
      }}))
    const token = res.data.login.message
    expect(res.data).toMatchSnapshot();
    executeOperation = setTestClient({token: token, port: 4001})
    res = await toPromise(executeOperation({
      query:updateUser, 
      variables: {
        newInfo,
      }
    }))
    expect(res.data).toMatchSnapshot();
    expect(res.data.updateUser.status).toBe(202)
    
  })
})

describe('request email', () => {
  test('with correct argument expect success', async () => {
    const res = await toPromise(executeOperation({
      query: requestEmail, 
      variables: {
        purpose: "passwordReset",
        email: "sayhimage@outlook.com",
        key: process.env.sentEmailKey,
      }
    }))
    expect(res.data).toMatchSnapshot()
    expect(res.data.requestEmail.status).toBe(201)
    const code = await redis.hget('passwordReset', "sayhimage@outlook.com")
    expect(code).toHaveLength(6)
  })

  test('with invalid purpose', async () => {
    const res = await toPromise(executeOperation({
      query: requestEmail, 
      variables: {
        purpose: "just sent",
        email: "sayhimage@outlook.com",
        key: process.env.sentEmailKey,
      }
    }))
    expect(res.data).toMatchSnapshot()
    expect(res.data.requestEmail.status).toBe(400)

  })

  test('with invalid key', async () => {
    const res = await toPromise(executeOperation({
      query: requestEmail, 
      variables: {
        purpose: "passwordReset",
        email: "sayhimage@outlook.com",
        key: "fjkslfjkl",
      }
    }))
    expect(res.data).toMatchSnapshot()
    expect(res.data.requestEmail.status).toBe(400)
  })
  test('with invalid email', async () => {
    const res = await toPromise(executeOperation({
      query: requestEmail, 
      variables: {
        purpose: "passwordReset",
        email: "sayhimage@.com",
        key: process.env.sentEmailKey,
      }
    }))
    expect(res.data).toMatchSnapshot()
    expect(res.data.requestEmail.status).toBe(400)
  })
})

describe('change password', () => {
  test('sign up', async () => {
    const res = await toPromise(executeOperation({
      query:signUp, 
      variables: {
        username: "halo",
        email: "sayhaimage@outlook.com",
        password: "correctPassword",
      }
    }))
    expect(res.data).toMatchSnapshot();
    expect(res.data.signUp.status).toBe(201)
  })
  test('get code', async () => {
    const res = await toPromise(executeOperation({
      query: requestEmail, 
      variables: {
        email: "sayhaimage@outlook.com",
        key: process.env.sentEmailKey,
        purpose: "passwordReset",
    }}))
    expect(res.data).toMatchSnapshot()
    expect(res.data.requestEmail.status).toBe(201)
    const code = await redis.hget('passwordReset', "sayhaimage@outlook.com")
    expect(code).toHaveLength(6)
  })
  test('do change', async () => {
    const code = await redis.hget('passwordReset', "sayhaimage@outlook.com")
    res = await toPromise(executeOperation({
      query:changePassword, 
      variables: {
        email: "sayhaimage@outlook.com",
        cert: code,
        newPassword: "ILoveSpaceX"
      }}))
    expect(res.data.changePassword.status).toBe(202)
    expect(res.data).toMatchSnapshot()
  })
  test('log in with new password', async () => {
    res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "username",
        value: "halo",
        password: "ILoveSpaceX",
      }}))
    expect(res.data).toMatchSnapshot()
    expect(res.data.login.status).toBe(201)
  })
  test('login with bad password', async () => {
    res = await toPromise(executeOperation({
      query:logIn, 
      variables: {
        key: "username",
        value: "halo",
        password: "badpassword",
      }}))
    expect(res.data).toMatchSnapshot()
    expect(res.data.login.status).toBe(400)
  });
})









