const { gql } = require('apollo-server-koa')

module.exports = gql`
  scalar DateTime
  type User {
    _id: String
    phone: String
    email: String
    theme: Theme
    username: String
    avatar: String
    backgroundImage: String
    website: String 
    introduce: String
    createdAt: DateTime
    liked: [String]
  }

  type Theme {
    primary: String
    background: String
    language: String
  }

  type Video {
    id: String
    title: String
    content: String
    thumbnail: String
    subtitles: String
    numberOfpros: Int
    numberOfreplies: Int
    authorName: String
    authorAvatar: String
    createdAt: DateTime
  }

  type Comment {
    _id: String
    author: String
    authorName: String
    authorAvatar: String
    content: String
    numberOfpros: Int
    numberOfreplies: Int
  }

  type Blog {
    _id: String
    title: String
    author: String
    authorName: String
    authorAvatar: String
    content: String
    description: String
    numberOfpros: Int
  }

  type Query {
    initUserSelf: User
    userInfo(username: String!): User
    getVideo(videoId: String!): Video
    getReplies(commentId: String!): [Comment]
    getBlogCaption(blog_id: String!): Blog
    readBlog(blog_id: String!): Blog
    getComments(subject: String!, id: String!): [Comment]
  }

  type Mutation {
    login(key: LogInKey!, value: String!, password: String!): writeResponse
    signUp(username: String!, email: String!, password: String!): writeResponse
    updateUser(newInfo: String!): writeResponse
    refreshToken: writeResponse
    changePassword(email: String!, newPassword:String, cert:String!): writeResponse

    uploadVideo(metaData: String!): writeResponse
    addComment(comment: String!): writeResponse
    addPros(commentId: String!, inc: Int!): writeResponse

    publishBlog(blog: String!): writeResponse

    leaveComment(comment: String!): writeResponse
    like(subject:String!, referId:String!, inc:Int!): writeResponse

    requestEmail(purpose:String!, key: String!, email: String!): writeResponse
    requestTencentYunKey(purpose: String!, fileExtention: String!): writeResponse
  }


  type writeResponse {
    status: Int!
    message: String!
    _id: String
  }

  enum LogInKey {
    username
    email
    phone
  } 
`
