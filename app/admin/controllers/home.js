module.exports = {
  async index(ctx, next) {
    await ctx.render('home', { user: ctx.session.user })
  }
}
