"use strict";
const Router = require("koa-router");
// const homeController = require("./controllers/duitang");
const Login = require('./controllers/login')

const admin = new Router({
  prefix: "/admin"
});
admin.get("/", Login.index);

module.exports = admin;
