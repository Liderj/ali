"use strict";

const Router = require("koa-router");
const homeController = require("./controllers/home");

const router = new Router({
  prefix: "/api"
});
router.get("/duitang/list", homeController.list);

module.exports = router;
