"use strict";
//日志
const bunyan = require("bunyan");
const config = require("./config/logger");

const logger = bunyan.createLogger(config);
module.exports = logger;
