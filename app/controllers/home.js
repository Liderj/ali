"use strict";

exports.welcome = ctx => {
  // BUSINESS LOGIC
  const data = {
    name: "lider",
    version: "v1"
  };

  ctx.res.fail(200, "Hello, API!", data);
};
