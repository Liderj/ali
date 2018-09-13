module.exports = {
  async index(ctx, next) {
    !ctx.session.user && ctx.redirect('/admin/login')
    await ctx.render('home', { user: ctx.session.user })
  }
}