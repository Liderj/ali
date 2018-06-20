const axios = require("axios");
axios.interceptors.response.use(
  function(response) {
    if (response.data.retcode != "000000") {
      // 三方api报错
      let errmsg = {
        message: response.data.message,
        code: response.data.retcode
      };
      throw new Error(JSON.stringify(errmsg));
    }
    return response.data;
  },
  function(error) {
    // 上抛错误
    return Promise.reject(error);
  }
);
module.exports = axios;
