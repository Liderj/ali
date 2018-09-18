"use strict";

const Router = require("koa-router");
const homeController = require("./controllers/duitang");
const postController = require("./controllers/post")

const router = new Router({
  prefix: "/api"
});
router.get("/duitang/list", homeController.list);

router.get('/post/list',postController.getList)
router.get("/post/:id",postController.getOne);
module.exports = router;
