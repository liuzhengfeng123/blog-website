import { Configuration } from 'webpack'
import 'webpack-dev-server'
import { merge } from 'webpack-merge'
import common from './webpack.common.js'

const config: Configuration = merge<Configuration>(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    static: '../dist',
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  }
})

export default config
