const { createProxyMiddleware } = require("http-proxy-middleware");

const BaseUrl = process.env.REACT_APP_API_URL;

module.exports = function (app) {
  app.use(
    ["/swagger", "/api/"],
    createProxyMiddleware({
      target: `${BaseUrl}/`,
    })
  )
}