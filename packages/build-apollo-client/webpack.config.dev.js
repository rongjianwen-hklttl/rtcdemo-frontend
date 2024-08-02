const path = require("path");
//const CopyWebpackPlugin = require("copy-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils")

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
    //"graphql": "Graphql",
    //"graphql-tag": "GraphqlTag",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].development.js",
    library: {
      name: "ApolloClient",
      type: "umd",
    },
    iife: true,
  },
  module: {
    rules: [
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: [ 'raw-loader' ]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                  'data-cke': true
              }
            }
          },
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
  entry: {
    "apollo-client": "./index.js",
  },
};