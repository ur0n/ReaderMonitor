import path from 'path';
import webpack from 'webpack';

const webpackConfig = {
  mode: 'none',
  target: "electron-renderer",
  entry: path.join(__dirname, "/src/index"),
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name].[ext]'
          }
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
    ]
  },
  externals: ['grpc'],
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      PROTO_PATH: JSON.stringify(path.join(__dirname, '/proto/'))
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.node'],
  },
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2', // モジュールを呼ぶための方式を指定*1
  }
}

export default webpackConfig;
