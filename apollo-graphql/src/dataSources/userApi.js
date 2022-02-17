const { DataSource } = require('apollo-datasource');
const { hashPassword, isPasswordCorrect } = require('../utils/password')
const { generateToken } = require('../utils/jwt');
const { redis } = require('../redis')

class UserAPI extends DataSource {
  constructor( model ) {
    super();
    this.model = model;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createUser({ username, email, password }) {
    const { salt, hash } = hashPassword(password)
    try {
      await this.model.create({password: hash, username, email, salt })
      return {
        status: 201,
        message: "success"
      }
    } catch (error) {
      if (error.code === 11000) {
        return {
          status: 400,
          message: `${Object.keys(error.keyValue)} must be unique`,
        }
      } else {
        return {
          status: 500,
          message: 'database error'
        }
      }
    }
  }

  async updateInfo(newInfo) {
    try {
      var user = await this.model.findOne({_id: this.context.user?._id})
      if (user) {
        for (const [key, value] of Object.entries(newInfo)) {
          user[key] = value
        }
        await user.save()
        return {
          status: 202,
          message: "ok",
        }
      } else {
        return {
          status: 400,
          message: "user not exsits",
        }
      }
    } catch (error) {
      return {
        status: 501,
        message: "database error",
      }
    }

  }

  async refreshToken() {
    const user = this.context.user
    if (user) {
      return {
        status: 201,
        message: generateToken(user._id) 
      }
    }
    return {status: 400, message: "token invalid"}
  }

  async login(key, value, password) {
    const user = await this.model.findOne({[key]: value})
    if (user && isPasswordCorrect(user.password, user.salt, password)) {
      return {
        status: 201,
        message: generateToken(user._id)
      }
    }
    return {
      status: 400,
      message: "password or username not correct"
    }
  }

  async initUserSelf() {
    let user_id = this.context.user?._id
    return this.model.findOne({_id: user_id})
  }

  async getUserInfo( username ) {
    const projection = 'username backgroundImage avatar introduce website createdAt'
    return  await this.model.findOne({ username }, projection)
  }

  async changePassword({ email, newPassword, cert }) {
    const user = await this.model.findOne({ email })
    if (!user) return { status: 400, message: "user not exist"}
    const code = await redis.hget("passwordReset", email)
    if (cert !== code) return { status: 400, message: "cert not correct or expired"}
    try {
      const { salt, hash } = hashPassword(newPassword)
      user.salt = salt
      user.password = hash
      await user.save()
      return { status: 202, message: "ok"}
    } catch (error) {
      return {
        status: 500,
        message: "database error"
      }
    }
  }
}

module.exports = UserAPI;

