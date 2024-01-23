const { createProxyMiddleware } = require("http-proxy-middleware");
const { BaseUrl } = require("./index");

module.exports = function (app) {
  app.use(
    ["/swagger", "/api/"],
    createProxyMiddleware({
      target: `${BaseUrl}/`,
    })
  )
}