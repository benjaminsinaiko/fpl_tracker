const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'https://fantasy.premierleague.com/',
      changeOrigin: true,
    }),
    proxy('/accounts', {
      target: 'https://users.premierleague.com/',
      changeOrigin: true,
    }),
  );
};
