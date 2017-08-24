//↓↓↓↓追加
const webpack = require("webpack");
module.exports = {
  context: __dirname,
  entry: ['./src/main.js', './src/main.css',"./src/index.html"],

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },

  //↓↓↓↓追加
  plugins: [
    //new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{loader: 'eslint-loader'}],
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {presets: [['es2015', {modules: false}]]},
      //     },
      //   ],
      // },
    ],
    // preLoaders: [
    //     //Eslint loader
    //   { test: /\.js?$/, exclude: /node_modules/, loader: "eslint-loader"},
    // ],
    // loaders: [
    //   { test: /\.html$/, loader: "file?name=[name].[ext]" },
    //   { test: /\.css$/, loader: "file?name=[name].[ext]" },
    //   { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel']},
    // ],
  },
  resolve: {
    extensions: [ '.js']
  },
  // eslint: {
  //   configFile: './.eslintrc'
  // },
};
