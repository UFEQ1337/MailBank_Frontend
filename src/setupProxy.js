const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://localhost:7182',  // Upewnij się, że używasz https
            changeOrigin: true,
            secure: false,  // Dodaj tę linię, jeśli używasz samopodpisanego certyfikatu
        })
    );
};
