const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    index:true,
    unique:true
  },
  created:{
    type:String,
    default:Date.now,
  },
  content:String,
})

module.exports = mongoose.model('Post', PostSchema)