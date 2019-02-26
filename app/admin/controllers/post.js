const Post = require('../models/Post')
const xss = require('xss')
const moment = require('moment')
module.exports ={
  async index (ctx){
    let posts =await Post.find()
    posts.forEach(e=>{
      e.created = moment().format('YYYY-MM-DD,hh:mm:ss')
    })
    return ctx.render('post',{posts})
  },

  async getPost(ctx){
    try {
      let post =await Post.findById(ctx.params.id)
      return ctx.res.success(post, 'ok')
    } catch (error) {
      return ctx.res.ajaxReq(error.message)
    }

    
  },
  async editPost(ctx){
    let req = ctx.request.body
    try {
      let post =await Post.findById(ctx.params.id)
      if(!req.title){
        return ctx.res.ajaxReq('标题不能为空')
      }
      post.title = xss( req.title)
      post.content = xss( req.content)
      post.mdcontent=req.mdcontent
      let save =  await post.save()
      return ctx.res.success(save, 'ok')
    } catch (error) {
      return ctx.res.ajaxReq(error.message)
    }
  },
  async create (ctx){
    if(ctx.request.method =='GET'){
     return await ctx.render('createPost')
    } 
    let req = ctx.request.body
    if(!req.title){
      return ctx.res.ajaxReq('标题不能为空')
    }
    try {
      req.content = xss( req.content)
      req.mdcontent= req.mdcontent
      req.created = new Date()
      let save =  await Post.create(req)
      ctx.res.success(save, '创建成功')
    } catch (error) {
        return ctx.res.ajaxReq(error.message)
    }
  },
  async delete(ctx){
    let post = await  Post.deleteOne({_id:ctx.params.id})
    ctx.res.success(post, '删除成功')
  }
}