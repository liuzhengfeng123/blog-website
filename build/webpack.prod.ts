import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import common from './webpack.common'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer'

const config: Configuration = merge<Configuration>(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static', // 生成 HTML 文件
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
})

export default config
