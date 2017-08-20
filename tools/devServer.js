import Koa from 'koa';
import webpack from 'webpack';
import path from 'path';
import staticFiles from 'koa-static';
import dotenv from 'dotenv';
import debug from 'debug';

import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';

import config from '../webpack.config.dev';

dotenv.config();

const debugLog = debug('app:debug');
const infoLog = debug('app:info');
const errorLog = debug('app:error');

const port = process.env.PORT;
const app = new Koa();
const compiler = webpack(config);

debugLog('pubPath', config.output.publicPath);

app.use((ctx, next) => {
  // return index.html for react router requests
  if (ctx.request.url.match(/\..*$/) == null &&
    ctx.request.url.match(/webpack/) == null) {
    ctx.request.url = '/';
  }
  return next().then(() => {
    debugLog('Completed loading', ctx.request.url, ctx.response.status);
  }).catch((err) => {
    errorLog('ERROR', err);
  });
});

app.use(staticFiles(path.join(__dirname, '../static-test'), {
  index: 'index.html'
}));

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler));

app.listen(port, (err) => {
  if (err) {
    errorLog(err);
  } else {
    infoLog(`Server started on: http://localhost:${port}`);
  }
});