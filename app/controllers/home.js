const config = require("../config");
const axios = require("../config/axios");

const url = "/photo/duitang";
exports.list = async ctx => {
  try {
    if (ctx.method.toLocaleUpperCase() === "GET") {
      let res = await axios.get(config.api + url + "?apikey=" + config.apikey, {
        params: ctx.query
      });
      ctx.res.ok(res.data, "ok!");
    }
  } catch (error) {
    let err = JSON.parse(error.message);
    ctx.res.fail(err.code, err.message);
  }
};
