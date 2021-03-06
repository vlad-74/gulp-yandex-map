'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const path = require('path');
const gulplog = require('gulplog');

const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const notifier = require('node-notifier');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

// ОЧИЩАЕТ ПАПКИ
lazyRequireTask('clean', './gulp/clean', {
  dst: ['public', 'tmp', 'manifest']
});

//СОЗДАЕТ CSS ФАЙЛ С ХЕШОМ ИЛИ БЕЗ ХЕША ИЗ frontend/styles/index.styl
//!isDevelopment->assets.json | + ПЕРЕПИСЫВАЕТ url + isDevelopment->sourcemaps| + CSS + 
//!isDevelopment->СЖИМАЕТ + добавление хеша к имени| + DIST public/styles-> 
//!isDevelopment->ФИКСАЦИЯ ПУТИ ФАЙЛА CSS+хеш В css.json В ПАПКЕ manifest
lazyRequireTask('styles', './gulp/styles', {
  src: 'frontend/styles/index.styl'
});

//СОЗДАЕТ СПРАЙТ КАРТИНОК ИЗ frontend/styles/**/*.svg
//isDevelopment->DIST tmp/styles || !isDevelopment->DIST public/styles
lazyRequireTask('styles_svg', './gulp/styles_svg', {
  src: 'frontend/styles/**/*.svg',
  dst: 'tmp/styles',
  dst2: 'public/styles',
});

//СОЗДАЕТ СПРАЙТ КАРТИНОК ИЗ frontend/styles/**/*.{png,jpg}
//!isDevelopment->ДОБАВЛЕНИЕ ХЕША К ИМЕНИ| + DIST public/styles
//!isDevelopment->ФИКСАЦИЯ ПУТИ ФАЙЛА + хеш В assets.json В ПАПКЕ manifest
lazyRequireTask('styles_assets', './gulp/styles_assets', {
  src: 'frontend/styles/**/*.{png,jpg}',
  dst: 'public/styles'
});

//ПРОПИСЫВАЕТ ПУТИ CSS И JS ФАЙЛОВ С ХЕШОМ(!isDevelopment) ИЛИ БЕЗ В html ФАЙЛЕ
lazyRequireTask('assets', './gulp/assets', {
  src: 'frontend/assets/**',
  dst: 'public',
  taskName: 'assets'

});

const wbpck = function(callback) {

  let options = {
    entry:   {
      page: './frontend/js/page'
    },
    output:  {
      path:     __dirname + '/public/js',
      publicPath: '/js/',
      filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
    },
    node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty'
    },
    watch:   isDevelopment,
    devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
    module:  {
      exprContextRegExp: /$^/,
      exprContextCritical: false, //убираем warnings (с help-functions их много)
      loaders: [{
        test:    /\.js$/,
        include: path.join(__dirname, "frontend"),
        loader:  'babel?presets[]=es2015'
      },
      {
          test: /\.json$/,
          loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
      ]
    },
    plugins: [
      new webpack.NoErrorsPlugin() // otherwise error still gives a file
    ]
  };

  if (!isDevelopment) {
    options.plugins.push(
        new AssetsPlugin({
          filename: 'webpack.json',
          path:     __dirname + '/manifest',
          processOutput(assets) {
            for (let key in assets) {
              assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
              delete assets[key];
            }
            return JSON.stringify(assets);
          }
        })
    );
  }

  // https://webpack.github.io/docs/node.js-api.html
  webpack(options, function(err, stats) {
    if (!err) { // no hard error
      err = stats.toJson().errors[0];// try to get a soft error from stats
    }

    if (err) {
      notifier.notify({
        title: 'Webpack',
        message: err
      });

      gulplog.error(err);
    } else {
      gulplog.info(stats.toString({
        colors: true
      }));
    }

    // task never errs in watch mode, it waits and recompiles
    if (!options.watch && err) {
      callback(err);
    } else {
      callback();
    }
  });
};

gulp.task('webpack', wbpck);

gulp.task('build', gulp.series('clean', 'styles_svg', 'styles_assets', 'styles', gulp.parallel( 'webpack'), 'assets'));

gulp.task('watch', function() {
  gulp.watch(['frontend/styles/**/*.styl', 'tmp/styles/sprite.styl'], gulp.series('styles'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
  gulp.watch('frontend/styles/**/*.{png,jpg}', gulp.series('styles_assets'));
  gulp.watch('frontend/styles/**/*.svg', gulp.series('styles_svg'));
  gulp.watch('frontend/js/**/*.*', gulp.series('webpack'));
});

lazyRequireTask('serve', './gulp/serve', {
  src: 'public'
});

lazyRequireTask('minify', './gulp/minify', {
  from: 'public/js/*.js',
  to: 'public/js'
});

gulp.task('develop', gulp.series('build', 'minify', gulp.parallel('watch', 'serve')));

lazyRequireTask('lint', './gulp/lint', {
  cacheFilePath: process.cwd() + '/tmp/lintCache.json',
  src: 'frontend/**/*.js'
});

lazyRequireTask('dev_replace', './gulp/accesslogger', {
  from: 'accessLoger = false;',
  to: 'accessLoger = true;'
});

lazyRequireTask('prod_replace', './gulp/accesslogger', {
  from: 'accessLoger = true;',
  to: 'accessLoger = false;'
});

lazyRequireTask('prod', './gulp/setnodeenv', {
  path: 'gulp_prod.bat'
});

lazyRequireTask('dev', './gulp/setnodeenv', {
  path: 'gulp_dev.bat'
});
