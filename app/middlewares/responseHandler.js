"use strict";

/**
 * \HTTP Status codes
 */
const statusCodes = {
  CONTINUE: 100, //客户端继续请求
  OK: 200, //请求成功正常响应
  CREATED: 201, //请求已完成，创建新资源
  ACCEPTED: 202, //已接受请求，等待接受处理
  NO_CONTENT: 204, //请求已处理，无返回内容
  BAD_REQUEST: 400, //请求错误
  UNAUTHORIZED: 401, //拒绝访问
  FORBIDDEN: 403, //资源不可用
  NOT_FOUND: 404, //请求未找到
  REQUEST_TIMEOUT: 408, //在许可的等待时间内，客户端为发出任何请求
  UNPROCESSABLE_ENTITY: 422, //语义错误，无法响应请求
  INTERNAL_SERVER_ERROR: 500, //服务器错误
  NOT_IMPLEMENTED: 501, //服务器不支持实现请求所需功能
  BAD_GATEWAY: 502, //上游服务器收到无效的响应
  SERVICE_UNAVAILABLE: 503, //服务不可用
  GATEWAY_TIME_OUT: 504 //网关错误
};

function responseHandler() {
  return async (ctx, next) => {
    ctx.res.statusCodes = statusCodes;
    ctx.statusCodes = ctx.res.statusCodes;

    ctx.res.success = (data = null, message = null) => {
      ctx.status = ctx.status < 400 ? ctx.status : statusCodes.OK;
      
      ctx.body = { status: "success", data, message };
    };

    ctx.res.fail = (code = null, message = null, data = null) => {
      ctx.body = { status: "fail", code, data, message };
    };

    ctx.res.error = (code = null, message = null, data = null) => {
      ctx.status =
        ctx.status < 500 ? statusCodes.INTERNAL_SERVER_ERROR : ctx.status;
      ctx.body = { status: "error", code, data, message };
    };

    ctx.res.ok = (data, message) => {
      ctx.status = statusCodes.OK;
      ctx.res.success(data, message);
    };
    ctx.res.ajaxReq = (message) => {
      ctx.status = statusCodes.OK;
      ctx.res.fail(400,message,null);
    };
    ctx.res.created = (data, message) => {
      ctx.status = statusCodes.CREATED;
      ctx.res.success(data, message);
    };

    ctx.res.accepted = (data, message) => {
      ctx.status = statusCodes.ACCEPTED;
      ctx.res.success(data, message);
    };

    ctx.res.noContent = (data, message) => {
      ctx.status = statusCodes.NO_CONTENT;
      ctx.res.success(data, message);
    };

    ctx.res.badRequest = (code, message, data) => {
      ctx.status = statusCodes.BAD_REQUEST;
      ctx.res.fail(code, message, data);
    };

    ctx.res.forbidden = (code, message, data) => {
      ctx.status = statusCodes.FORBIDDEN;
      ctx.res.fail(code, message, data);
    };

    ctx.res.notFound = (code, message, data) => {
      ctx.status = statusCodes.NOT_FOUND;
      ctx.res.fail(code, message, data);
    };

    ctx.res.requestTimeout = (code, message, data) => {
      ctx.status = statusCodes.REQUEST_TIMEOUT;
      ctx.res.fail(code, message, data);
    };

    ctx.res.unprocessableEntity = (code, message, data) => {
      ctx.status = statusCodes.UNPROCESSABLE_ENTITY;
      ctx.res.fail(code, message, data);
    };

    ctx.res.internalServerError = (code, message, data) => {
      ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
      ctx.res.error(code, message, data);
    };

    ctx.res.notImplemented = (code, message, data) => {
      ctx.status = statusCodes.NOT_IMPLEMENTED;
      ctx.res.error(code, message, data);
    };

    ctx.res.badGateway = (code, message, data) => {
      ctx.status = statusCodes.BAD_GATEWAY;
      ctx.res.error(code, message, data);
    };

    ctx.res.serviceUnavailable = (code, message, data) => {
      ctx.status = statusCodes.SERVICE_UNAVAILABLE;
      ctx.res.error(code, message, data);
    };

    ctx.res.gatewayTimeOut = (code, message, data) => {
      ctx.status = statusCodes.GATEWAY_TIME_OUT;
      ctx.res.error(code, message, data);
    };
    await next();
  };
}

module.exports = responseHandler;
