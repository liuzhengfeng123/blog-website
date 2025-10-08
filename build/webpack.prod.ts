import path from 'path'
import { fileURLToPath } from 'url'
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import common from './webpack.common'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer'
import CompressionPlugin from 'compression-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: Configuration = merge<Configuration>(common, {
  mode: 'production',
  plugins: [
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static', // 生成 HTML 文件
      openAnalyzer: false,
      reportFilename: path.resolve(__dirname, 'bundle-report.html')
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      algorithm: 'gzip',
      threshold: 10240
    })
  ]
})

export default config
