"use strict";
const Router = require("koa-router");
// const homeController = require("./controllers/duitang");
const Login = require('./controllers/login')
const Home = require('./controllers/home')
const Post = require('./controllers/post')

const admin = new Router({
  prefix: "/admin"
});
admin.get("/login", Login.index);
admin.post("/login", Login.login);
admin.get('/logout', Login.logout)
admin.get('/home',Home.index)


admin.post('/post',Post.create)
module.exports = admin;
