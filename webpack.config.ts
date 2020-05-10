import path from 'path'

import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
  entry: './src/av/index.tsx',
  output: { path: path.resolve(__dirname, 'dist') },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { av: path.resolve(__dirname, 'src/av') }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { configFile: 'tsconfig.av.json' } }]
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.woff$/, use: 'file-loader' }
    ]
  },

  externals: { electron: 'commonjs electron' },

  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'src/av/static/index.html' })
  ]
}

export default config
