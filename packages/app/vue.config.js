module.exports = {
  publicPath: './',
  outputDir: 'app',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.40.204.134:8666',
        ws: true,
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}