const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/swagger", "/api/"],
    createProxyMiddleware({
      target: "https://pacmen_api:8001",
    })
  )
}