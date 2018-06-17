const path = require('path')
const NodemonPlugin = require( 'nodemon-webpack-plugin' ) 
var nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  target: 'node',
/*   externals: [nodeExternals({
    whitelist: ['reflect-metadata', 'express', /^lodash/]
  })], */
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.graphql']
  },
  node: {

  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
/*   plugins: [
    new NodemonPlugin(), // Dong
  ] */
}