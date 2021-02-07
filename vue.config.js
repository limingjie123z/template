const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
// 引入等比适配插件
const px2rem = require("postcss-px2rem");
const Version = new Date().getTime();
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
});
// const webpack = require("webpack");
// const StatsPlugin = require('stats-webpack-plugin')
module.exports = {
  pluginOptions: {
    pwa: {
      iconPaths: {
        favicon32: "favicon.ico",
        favicon16: "favicon.ico",
        appleTouchIcon: "favicon.ico",
        maskIcon: "favicon.ico",
        msTileImage: "favicon.ico"
      }
    }
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcss]
      },
	  sass: {
	  	prependData: `@import "@/styles/index.scss";`
	  }
    },
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      // 修改打包后css文件名
      filename: `static/css/[name].${Version}.css`,
      chunkFilename: `static/css/[name].${Version}.css`
    }
  },
  // baseUrl: './',
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      // filename: utils.assetsPath('js/[name].[chunkhash].'+Version+'js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].'+Version+'js')
      filename: `static/js/[name].${Version}.js`,
      chunkFilename: `static/js/[name].${Version}.js`
    },
    externals: {
      vue: "Vue",
      "vue-resource": "VueResource",
      "element-ui": "element-ui",
      jquery: "jquery",
      "babel-polyfill": "babel-polyfill",
      vuex: "Vuex",
      "vue-ueditor-wrap": "vue-ueditor-wrap",
      "vue-router": "VueRouter"
    }
  },
  chainWebpack(config) {
    if (process.env.use_analyzer) {
      // 分析
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }

    // img的文件名修改
    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => {
        options.name = `static/img/[name].${Version}.[ext]`;
        options.fallback = {
          loader: "file-loader",
          options: {
            name: `static/img/[name].${Version}.[ext]`
          }
        };
        return options;
      });
  },
  productionSourceMap: false
};
