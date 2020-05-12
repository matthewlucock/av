import path from 'path'

import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config: webpack.Configuration = {
  entry: './src/av/index.tsx',
  output: { path: path.resolve('dist') },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { av: path.resolve('src/av') }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { configFile: path.resolve('tsconfig.av.json') } }]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()]
}

export default config
