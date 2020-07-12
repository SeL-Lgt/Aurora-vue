const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  //选项
  publicPath: "./",    //基本路径
  outputDir: "dist",    //构件时输出的目录
  assetsDir: "static",    //放置静态资源的目录
  indexPath: "index.html",    //html的输出路径
  filenameHashing: true,    //文件名哈希
  lintOnSave: true,    //是否在保存的时候使用`eslint-loader`进行检查
  runtimeCompiler: false,   //是否使用带有浏览器内编译器的完整构建版本
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  css: { // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: true, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: { // css预设器配置项
      sass: {
        prependData: `@import "@/assets/css/main.scss";`
      }
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null,
    // proxy: {
    //     '/api': {
    //         target: '<url>',
    //         ws: true,
    //         changOrigin: true
    //     }
    // },
    // eslint-disable-next-line no-unused-vars
    before: app => {
    }
  }
}
