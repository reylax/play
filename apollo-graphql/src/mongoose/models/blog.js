const mongoose = require('mongoose');

const root = process.env.bucketUrl

const BlogSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: [{ type: 'ObjectId', ref: 'Comment' }],
    default: [],
  },
  numberOfpros: {
    type: Number,
    default: 0,
  },
}, 
{
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
})

module.exports = BlogSchema