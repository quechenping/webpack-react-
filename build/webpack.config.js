const path = require("path"); //设置路径
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html文件
const miniCssExtractPlugin = require("mini-css-extract-plugin"); //打包时分离css文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包时清空dist文件夹
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css文件
const TerserPlugin = require("terser-webpack-plugin"); //压缩js文件
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const theme = require("../theme");
const darkTheme = require("@ant-design/dark-theme").default;
const { resolveAssetsRootDir } = require("../src/utils/utils");

module.exports = {
  mode: "production",
  entry: {
    app: path.join(__dirname, "./../", "src/index.js")
  },
  output: {
    path: path.join(__dirname, "./../", "dist"), //文件路径
    filename: resolveAssetsRootDir("js/[name].js")
  },
  module: {
    rules: [
      {
        //解析图片文件
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          // outputPath: "img", //图片最终输出的位置
          // publicPath: "./img", //图片路径
          name: resolveAssetsRootDir("img/[name].[hash:7].[ext]"),
          limit: 8192 //图片大小小于8k时转base64格式
        }
      },
      {
        //解析js和jsx语法
        test: /\.js(x?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      },
      {
        //解析less文件
        test: /\.(less|css)$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          {
            loader: "less-loader",
            options: {
              //禁用内联js代码，这个功能用于禁用在样式表中写js代码
              javascriptEnabled: true,
              //根据antd官网进行主题修改
              // modifyVars: darkTheme
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热加载
    new miniCssExtractPlugin({
      filename: resolveAssetsRootDir("css/[name].css")
    }),
    new HtmlWebpackPlugin({
      title: "webpack", //生成html的title标签
      template: "build/react/index.html"
    }),
    new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    // 性能配置
    minimizer: [
      //js压缩
      new TerserPlugin({
        cache: true,
        // parallel: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"] // 移除console
          }
        }
        // sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require("cssnano"), // 使用 cssnano 压缩器
        cssProcessorOptions: {
          reduceIdents: false,
          autoprefixer: false,
          safe: true,
          discardComments: {
            removeAll: true
          }
        }
      })
    ]
  },
  resolve: {
    //后缀可不带，路径语法糖
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@components": path.join(__dirname, "./../", "src/components"),
      "@utils": path.join(__dirname, "./../", "src/utils")
    }
  },
  devServer: {
    hot: true, //热
    open: true, //自动打开浏览器
    port: 8000 //端口
  }
};
