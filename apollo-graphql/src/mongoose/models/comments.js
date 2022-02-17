const mongoose = require('mongoose');

const root = process.env.bucketUrl

const CommentSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true,
  },
  comments: {
    type: [{ type: 'ObjectId', ref: 'Comment' }],
    default: [],
  },
  numberOfreplies: {
    type: Number,
    get: function(){ return this.comments.length },
  },
  numberOfpros: {
    type: Number,
    default: 0,
  },
  LikedBy: {
    type: [{type: 'ObjectId', ref: 'Comment'}],
    default: []
  }
},
{
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
})


module.exports = CommentSchema
