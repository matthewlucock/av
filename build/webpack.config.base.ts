import path from 'path'

import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const APP = path.resolve('src/app')
export const STATIC = path.resolve('src/static')

const config: webpack.Configuration = {
  mode: 'production',
  entry: path.join(APP, 'index.tsx'),
  output: { path: path.resolve('dist') },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '@': APP
    }
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCaseOnly',
                localIdentName: '[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [autoprefixer] }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },

      {
        test: /\.woff2?$/,
        use: {
          loader: 'file-loader',
          options: { name: '[hash:base64:10].[ext]' }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin()
  ]
}

export default config
