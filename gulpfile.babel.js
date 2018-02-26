'use strict';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import { server } from 'electron-connect';
const electron = server.create();
import packager from 'electron-packager';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

gulp.task('serve:watch', () => {
  // Electronの起動
  electron.start();
  // BrowserProcess(MainProcess)が読み込むリソースが変更されたら, Electron自体を再起動
  gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['serve:compile']);

  gulp.watch(['build/dist/bundle.js'], () => {
    console.log("restart!");
    electron.restart;
  });
  gulp.watch(['./public/index.html', 'build/dist/bundle.js'], electron.reload);
  // RendererProcessが読み込むリソースが変更されたら, RendererProcessにreloadさせる
  gulp.watch(['.serve/styles/**/*.css', '.serve/renderer/**/*.{html,js}'], electron.reload);
});


gulp.task('package:darwin', ['build'], done => {
  packager({
    dir: 'dist',              // アプリケーションのパッケージとなるディレクトリ
    out: 'release/darwin',    // .app や .exeの出力先ディレクトリ
    name: 'ElectronApp',      // アプリケーション名
    arch: 'x64',              // CPU種別. x64 or ia32
    platform: 'darwin',       // OS種別. darwin or win32 or linux
    version: '0.28.1'         // Electronのversion
  }, (err, path) => {
    // 追加でパッケージに手を加えたければ, path配下を適宜いじる
    done();
  });
});

gulp.task('serve:compile', () => {
  gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(plumber())
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('build/dist'))
})
