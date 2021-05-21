import path from 'path'

import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import base, { STATIC } from './webpack.config.base'

const config: webpack.Configuration = merge(base, {
  resolve: {
    alias: {
      __main_process__: false
    }
  },

  plugins: [
    new webpack.DefinePlugin({ __ELECTRON__: false }),
    new HtmlWebpackPlugin({ template: path.join(STATIC, 'browser.html') })
  ]
})

export default config
