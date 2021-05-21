import path from 'path'

import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import base, { STATIC } from './webpack.config.base'

const config: webpack.Configuration = merge(base, {
  externals: {
    electron: 'commonjs2 electron',
    __main_process__: 'root __main_process__'
  },

  plugins: [
    new webpack.DefinePlugin({ __ELECTRON__: true }),
    new HtmlWebpackPlugin({ template: path.join(STATIC, 'electron.html') })
  ]
})

export default config
