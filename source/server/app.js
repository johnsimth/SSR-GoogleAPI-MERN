import path from 'path';
import express from 'express';
import settings from 'server/settings';
import proxyMiddleware from 'http-proxy-middleware';
import mainRoute from './routes/main';


const buildDir = '/static';
const staticDir = path.join(settings.APP_HOME, buildDir);

app.use('/business/static', express.static(staticDir));

var options = {
  target: 'http://localhost:3333',
  changeOrigin: true,
  pathRewrite: {'^/api' : ''} // <-- this will remove the /api prefix
};

app.use(proxyMiddleware('/api/**', options));

app.use('/', mainRoute);

export default app;
