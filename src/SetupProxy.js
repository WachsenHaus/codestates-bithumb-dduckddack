const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware(['/chatting'], {
  //     target: 'https://3.90.102.135:8080',
  //     changeOrigin: true,
  //     secure: false,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware(['/chatting/ws-stomp'], {
  //     target: 'https://3.90.102.135:8080',
  //     changeOrigin: true,
  //     ws: true,
  //     secure: false,
  //     router: {
  //       '/chatting/ws-stomp/**': 'wss://3.90.102.135:8080',
  //     },
  //   })
  // );
  // app.use(
  //   createProxyMiddleware(['/user'], {
  //     target: 'https://3.90.102.135:8080',
  //     changeOrigin: true,
  //     secure: false,
  //   })
  // );
};
