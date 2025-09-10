import path from 'path'
import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default merge(common, {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(import.meta.dirname, '../dist'),
    filename: 'index.js',
    clean: true
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    static: '../dist',
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(import.meta.dirname, 'index.html'),
      inject: 'body'
    }),
    new VueLoaderPlugin()
  ]
})
