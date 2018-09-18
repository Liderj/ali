const Post = require('../admin/models/Post')
const moment = require('moment')

module.exports = {
  async getList(ctx) {
    let posts =await Post.find().select('-content')
    posts.forEach(e=>{
      e.created = moment().format('YYYY-MM-DD,h:mm:ss')
    })
    ctx.res.ok(posts, "ok!");
  },
  async getOne(ctx){
    const _id = ctx.params.id
    let post =await Post.findById(_id)
    post.created = moment().format('YYYY-MM-DD,h:mm:ss')
    ctx.res.ok(post, "ok!");
  }
}