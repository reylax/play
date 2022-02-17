const { GraphQLDateTime } = require('graphql-iso-date');
const { mailto } = require('./utils/nodemailer')
const sentEmailKey = process.env.sentEmailKey
const usernameReg = /^[a-z][a-z0-9]{1,19}$/
const passwordReg = /^.{6,30}$/
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const { redis } = require('./redis');

module.exports = {
  DateTime: GraphQLDateTime,

  Query: {
    initUserSelf: (_, __, { dataSources, user }) => {
      if (!user) {
        return {
          status: 403,
          message: "forbid"
        }
      }
      return dataSources.userApi.initUserSelf() 
    },
    userInfo: (_, { username }, { dataSources }) => {
      return dataSources.userApi.getUserInfo(username) 
    },
    
    getVideo: (_, { videoId }, { dataSources }) => {
      return dataSources.videoApi.getVideo({ videoId })
    },

    getReplies: (_, { commentId }, { dataSources }) => {
      return dataSources.commentApi.getReplies({commentId})
    },

    getBlogCaption: (_, {blog_id}, {dataSources}) => {
      return dataSources.blogApi.blogCaption({blog_id})
    },

    readBlog: (_, { blog_id }, { dataSources }) => {
      return dataSources.blogApi.readBlog({ blog_id })
    },

    getComments: (_, {subject, id }, {dataSources}) => {
      return dataSources.commentApi.getComments({ subject, id })
    }
  },

  Mutation: {
    login: (_, { key, value, password }, { dataSources }) => {
      return dataSources.userApi.login(key, value, password)
    },

    signUp: async (_, { username, email, password }, { dataSources }) => {
      if (usernameReg.test(username) && 
          passwordReg.test(password) && emailReg.test(email)) {
            return dataSources.userApi.createUser({username, email, password})
        } else {
            return {
              status: 400,
              message: "invalid information"
            }
      }
    },

    updateUser: (_, { newInfo }, { dataSources, user }) => {
      if (!user) return { status: 400, message: "invalid quest"}
      newInfo = JSON.parse(newInfo)
      for (const [key, value] of Object.entries(newInfo)) {
        if (!validUpdate(key, value))
          return {
            status: 400,
            message: "critical info can't change this way"
          }
      }
      return dataSources.userApi.updateInfo(newInfo)
    },

    refreshToken: (_, __, { dataSources, user }) => {
      if (!user) return {status: 400, message: "invalid request"}
      return dataSources.userApi.refreshToken()
    },

    changePassword: (_, { email, newPassword, cert }, { dataSources }) => {
      if (!emailReg.test(email)) return { status: 400, message: "invalid email"}
      if (!passwordReg.test(newPassword)) return { status: 400, message: "invalid password"}
      if (cert.length > 7) return { status: 400, message: "invalid cert"}

      return dataSources.userApi.changePassword({ email, newPassword, cert })
    },

    uploadVideo: (_, { metaData }, { dataSources }) => {
      let video = JSON.parse(metaData)
      return dataSources.videoApi.uploadVideo({video})
    },

    publishBlog: (_, { blog }, {dataSources}) => {
      blog = JSON.parse(blog)
      return dataSources.blogApi.publishBlog({ blog })
    },

    addComment: (_, { comment }, { dataSources }) => {
      comment = JSON.parse(comment)
      return dataSources.commentApi.addComment({comment})
    },

    addPros: (_, { commentId, inc }, { dataSources }) => {
      return dataSources.commentApi.addPros({ commentId, inc })
    },

    leaveComment: (_, { comment }, { dataSources }) => {
      return dataSources.commentApi.leaveComment({ comment })
    },

    like: (_, { subject, referId, inc }, { dataSources }) => {
      return dataSources.commentApi.like({subject, referId, inc})
    },

    requestEmail: async (_, { purpose, key, email }) => {
      if (key !== sentEmailKey) return { status: 400, message: 'invalid key' }
      if (!validEmailPurpose.has(purpose)) return { status: 400, message: 'invalid purpose' }
      if (!emailReg.test(email)) return { status: 400, message: "invalid email"}

      let code = generateRandomCode()
      const subject = "Learning with interests"
      const body = generateEmailBody(code)
      try {
        await redis.hset(purpose, email, code)
        await mailto(email, subject, body)
        return {
          status: 201,
          message: "code have sent"
        }
      } catch (error) {
        return {
          status: 401,
          message: "email service busy please try again later"
        }
      }
    },

    requestTencentYunKey: async (_, { purpose, fileExtention }, { dataSources, user }) => {
      // 权限检查
      if (!user) {
        return {
          status: 403,
          message: "action not allowed!"
        }
      }
      let _id = user._id
      return dataSources.restApi.requestTencentYunKey({ purpose, _id, fileExtention})
    },
  },

  // Subscription: {
  //   sentSignail: {
  //     subscribe: 
  //   }
  // }

}

const validUpdate = (key, value) => {
  try {
    if (key.length > 30 || key === "password" || key === "email" || value.length > 500) 
      return false
  } catch (error) {
    return false
  }
  return true
} 

const validEmailPurpose = new Set(['passwordReset'])

const generateRandomCode = () => {
  let code = ""
  for (let i=0; i < 6; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}

generateEmailBody = code => {
  return (
  `
  <div style="width: 100vw;">
    <h1 style="text-align: center;">Nice to have you in Another View.</h1>
    <h2 style="text-align: center;">Here's the password reset code</h2>
    <p style="text-align:center; line-height: 70px; font-size: 40px; margin: 0px; color: aqua;">${code}</p>
  </div>
  `
  )
}