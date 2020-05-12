import path from 'path'

import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import base from './webpack.config.base'

const AV_STATIC = 'src/av/static/electron'

export default merge.smart(base, {
  resolve: { alias: { av_static: path.resolve(__dirname, AV_STATIC) } },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { configFile: 'tsconfig.av.json' } }]
      },
      { test: /\.woff$/, use: 'file-loader' }
    ]
  },

  externals: { electron: 'commonjs electron' },

  plugins: [
    new webpack.DefinePlugin({ __ELECTRON__: true }),
    new HtmlWebpackPlugin({ template: path.join(AV_STATIC, 'index.html') })
  ]
})
