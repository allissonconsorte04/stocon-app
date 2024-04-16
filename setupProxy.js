const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000/v1', // Altere para o endereço do seu servidor
      changeOrigin: true,
    })
  );
};
