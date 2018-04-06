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
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
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
