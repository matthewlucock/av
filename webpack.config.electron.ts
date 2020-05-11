import path from 'path'

import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import base from './webpack.config.base'

const AV_ENV = 'src/av/env/electron'

export default merge.smart(base, {
  resolve: { alias: { av_env: path.resolve(__dirname, AV_ENV) } },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { configFile: 'tsconfig.av.electron.json' } }]
      },
      { test: /\.woff$/, use: 'file-loader' }
    ]
  },

  externals: { electron: 'commonjs electron' },

  plugins: [
    new HtmlWebpackPlugin({ template: path.join(AV_ENV, 'static/index.html') })
  ]
})
