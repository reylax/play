const mongoose = require('mongoose');

const UserSchema = require('./user')
const VideoSchema = require('./video')
const CommentSchema  = require('./comments')
const BlogSchema = require('./blog.js')

const VIDEO = mongoose.model("Video", VideoSchema)
const USER = mongoose.model('User', UserSchema)
const COMMENT = mongoose.model('Comment', CommentSchema)
const BLOG = mongoose.model('Blog', BlogSchema)


module.exports = {
  USER,
  VIDEO,
  COMMENT,
  BLOG
}