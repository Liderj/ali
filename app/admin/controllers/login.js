const User = require('../models/User')

module.exports={
  async index (ctx,next){
    await ctx.render('login',{})
  }
}