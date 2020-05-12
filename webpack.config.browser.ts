import path from 'path'

import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import base from './webpack.config.base'

const AV_STATIC = path.resolve('src/av/static/browser')

export default merge.smart(base, {
  resolve: { alias: { av_static: AV_STATIC } },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { configFile: path.resolve('tsconfig.av.json') } }]
      },
      {
        test: path.resolve('node_modules/electron/index.js'),
        use: 'null-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({ __ELECTRON__: false }),
    new HtmlWebpackPlugin({ template: path.resolve(AV_STATIC, 'index.html') })
  ]
})
