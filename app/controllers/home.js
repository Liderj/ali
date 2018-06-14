"use strict";

const pkginfo = require("../../package.json");
exports.welcome = ctx => {
  // BUSINESS LOGIC
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author
  };

  ctx.res.fail(200, "Hello, API!", data);
};
