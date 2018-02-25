import path from 'path';

const webpackConfig = {
  target: "electron-main",
  entry: "./src/index",
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: [ /node_modules/, /functions/ ],
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
  }
}

export default webpackConfig;
