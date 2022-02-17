const mongoose = require('mongoose');

const root = process.env.bucketUrl

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      require: true,
    },
    phone: String,
    avatar: { 
      type: String, 
      get: value => {if (value) return `${root}${value}`} 
    },
    backgroundImage: { 
      type: String, 
      get: value => {if (value) return `${root}${value}`} 
    },
    introduce: String,
    theme: {
      type: {
        primary: String,
        background: String,
        language: String,
      }
    },
    comments: {
      type: [{type: "ObjectId", ref: "Comment"}],
      default: [],
    },
    videos:{
      type: [{type: "ObjectId", ref: "Video"}],
      default: [],
    },
    blogs: {
      type: [{type: "ObjectId", ref: "Blog"}],
      default: [],
    },
    liked: {
      type: [{type: String}],
      default: []
    },
    likedComments:{
      type: [{type: "ObjectId", ref: "Comment"}],
      default: [],
    },
    likedVideos:{
      type: [{type: "ObjectId", ref: "Video"}],
      default: [],
    },
    likedBlogs: {
      type: [{type: "ObjectId", ref: "Blog"}],
      default: [],
    },
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);


module.exports = UserSchema
