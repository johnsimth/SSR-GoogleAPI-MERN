import path from 'path';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';
import settings from './settings';

const app = express();

const buildDir = '/static';
const staticDir = path.join(settings.APP_HOME, buildDir);

app.use('/business/static', express.static(staticDir));

var options = {
  target: 'http://localhost:3333',
  changeOrigin: true,
  pathRewrite: {'^/api' : ''} // <-- this will remove the /api prefix
};

app.get('/business*', (req, res)=>res.sendFile(staticDir+'/index.html'));
app.get('*', ()=>console.log('-------->'));

app.use(proxyMiddleware('/api/**', options));

const port = process.env.APP_PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${ port }`);
});
