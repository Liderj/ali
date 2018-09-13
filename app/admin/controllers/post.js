const Post = require('../models/Post')
module.exports ={
  async create (ctx){
    let req = ctx.request.body
    try {
      let save =  await Post.create(req);
      ctx.res.success(save, '创建成功');
    } catch (error) {
      return ctx.res.ajaxReq(error.errmsg);
    }
  }
}