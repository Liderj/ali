#!/usr/bin/env node

"use strict";
const path = require("path")


const config = require("./config");
const Koa = require("koa");
const cors = require("kcors");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./middlewares/errorHandler");
const logMiddleware = require("./middlewares/log");
const logger = require("./logger");
const requestId = require("./middlewares/requestId");
const responseHandler = require("./middlewares/responseHandler");
const serve = require('koa-static')
const koaNunjucks = require('koa-nunjucks-2');
const session = require('koa-session')
const router = require("./routes");
const admin = require("./admin/adminRouter");
const mongoose = require('mongoose')
mongoose.connect(config.mongodb)

const app = new Koa();

app.keys = ['lider']
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e)
  }
});
// Trust proxy
app.proxy = true;

// Set middlewares
app.use(
  bodyParser({
    enableTypes: ["json", "form"],
    formLimit: "10mb",
    jsonLimit: "10mb"
  })
);

app.use(requestId());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    exposeHeaders: ["X-Request-Id"]
  })
);

app.use(session({
  key: config.session.key,
  maxAge: config.session.maxAge
}, app))


app.use(serve(path.join(__dirname, './public')))

app.use(koaNunjucks({
  ext: 'njk',
  path: path.join(__dirname, './admin/views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));
app.use(responseHandler());
app.use(errorHandler());
app.use(logMiddleware({ logger }));
// api路由
app.use(router.routes());
// 后台路由
app.use(admin.routes());
app.use(router.allowedMethods());

function onError(err) {
  logger.error({ err, event: "error" }, "Unhandled exception occured");
}

// Handle uncaught errors
app.on("error", onError);

// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info(
      { event: "execute" },
      `API server listening on ${config.host}:${config.port}, in ${config.env}`
    );
  });
  server.on("error", onError);
}

// Expose app
module.exports = app;
