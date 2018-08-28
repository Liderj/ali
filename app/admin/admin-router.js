"use strict";
const Router = require("koa-router");
// const homeController = require("./controllers/duitang");

const admin = new Router({
  prefix: "/admin"
});
admin.get("/",  (ctx, next) => {
  ctx.body = 'Hello World!';
});

module.exports = admin;
