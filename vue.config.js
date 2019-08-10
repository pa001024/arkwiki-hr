const WebpackDeepScopePlugin = require('webpack-deep-scope-plugin').default;

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
  },
  // configureWebpack: {
  //   plugins: [new WebpackDeepScopePlugin()],
  // },
};
