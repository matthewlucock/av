import path from 'path'

import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
  entry: './src/renderer/index.tsx',
  output: { path: path.resolve(__dirname, 'dist') },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { av: path.resolve(__dirname, 'src/renderer') }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { configFile: 'tsconfig.renderer.json' } }]
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.woff$/, use: 'file-loader' }
    ]
  },
  externals: { electron: 'commonjs electron' },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'src/renderer/index.html' })
  ]
}

export default config
