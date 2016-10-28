const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack/webpack.dev.config');
const PORT = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }

  console.log(`Listening to http://localhost:${PORT}`);
});
