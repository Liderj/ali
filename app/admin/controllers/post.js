const Post = require('../models/Post')
module.exports ={
  async index (ctx){
    await ctx.render('createPost')
  },
  async create (ctx){
    let req = ctx.request.body;
    if(!req.title){
      return ctx.res.ajaxReq('标题不能为空');
    }
    
    try {
      let save =  await Post.create(req);
      ctx.res.success(save, '创建成功');
    } catch (error) {
      return ctx.res.ajaxReq(error.errmsg);
    }
  }
}