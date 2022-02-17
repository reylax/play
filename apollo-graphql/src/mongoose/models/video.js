const mongoose = require('mongoose')

const root = process.env.bucketUrl

const VideoSchema = new mongoose.Schema({
    author: {
      type: 'ObjectId', 
      ref: 'User',
      requireed: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      get: value => {if (value) return `${root}${value}`} 
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
      get: value => `${root}/video/${value}`
    },
    comments: {
      type: [{ type: 'ObjectId', ref: 'Comment' }],
      default: [],
    },
    thumbnail: {
      type: String,
      get: value => { if (value) return `${root}/thumbnail/${value}`}
    },
    subtitles:{
     type: String, 
    },
    numberOfpros: {
      type: Number,
      default: 0,
    },
    numberOfreplies: {
      type: Number,
      get: function(){ return this.comments.length },
    },
  },
  {
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
  }
)



module.exports = VideoSchema