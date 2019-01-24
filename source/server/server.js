//import app from './app.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import path from 'path';
import express from 'express';
import settings from 'server/settings';
import proxyMiddleware from 'http-proxy-middleware';
import mainRoute from './routes/main';
import App from 'shared/components/app';

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
    typography: {
      useNextVariants: true,
    },
  });

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <App />
      </MuiThemeProvider>
    </JssProvider>,
  );

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css));
}

const app = express();

const buildDir = '/static';
const staticDir = path.join(settings.APP_HOME, buildDir);

app.use('/business/static', express.static(staticDir));

var options = {
  target: 'http://localhost:3333',
  changeOrigin: true,
  pathRewrite: {'^/api' : ''} // <-- this will remove the /api prefix
};

//app.get('*', (req, res)=>res.sendFile(staticDir+'/index.html'));
app.use(proxyMiddleware('/api/**', options));
// This is fired every time the server-side receives a request.
app.use(handleRender);



const port = process.env.APP_PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${ port }`);
});
