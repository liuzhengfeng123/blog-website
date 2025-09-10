import path from 'path'

export default {
  context: path.resolve(import.meta.dirname, '..'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    symlinks: false,
    alias: {
      '@': path.resolve(import.meta.dirname, '../src'),
      cwd: path.resolve(import.meta.dirname, '..')
    }
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        include: path.join(import.meta.dirname, '../docs/'),
        use: [
          {
            loader: './md-loader/index.js'
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: (file) => {
          return /node_modules/.test(file)
        },
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
