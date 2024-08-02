const path = require("path");
//const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

/**
* copy-webpack-plugin is a plugin of webpack. 
You can know more about it from document: https://webpack.js.org/plugins/
* Notice: Here I doesn't need it. :p
*/

module.exports = {
  mode: "development",
  experiments: {
    outputModule: true,
  },
  externals: {
    "react": "React",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].development.js",
    library: {
      name: "ckeditor5",
      type: "umd",
    },
    iife: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          }
        ]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: [ 'raw-loader' ]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig( {
                themeImporter: {
                  themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                },
                minify: true
              })
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx']
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'ckeditor5.development.css',
  })],
  entry: {
    "ckeditor5": "./index.js",
  },
};