module.exports = ()=>{
  return async (ctx,next)=>{
    if(ctx.path.includes('admin') && !ctx.session.user&& !ctx.path.includes('login') ){
       ctx.redirect('/admin/login')
    }else{
      await next()
    }
  }
}


