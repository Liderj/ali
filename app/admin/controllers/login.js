const User = require('../models/User')

module.exports={
  async index (ctx,next){
   await ctx.render('login',{})
  },
  async login (ctx,next){
    let req = ctx.request.body
    let user = await User.findOne({name:req.name})
    if(!user){
     return  ctx.res.ajaxReq('用户不存在');
    }
    if(user.password !==req.password){
      return ctx.res.ajaxReq('密码错误');
    }
    ctx.res.success(user, '登录成功');
  }
} 