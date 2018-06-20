"use strict";

const Router = require("koa-router");
const homeController = require("./controllers/home");

const router = new Router();
router.get("/duitang/list", homeController.list);

module.exports = router;
