'use strict';

var gulp        = require('gulp'),
    slim        = require('gulp-slim'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    postcss     = require('gulp-postcss'),
    imagemin    = require('gulp-imagemin'),
      png         = require('imagemin-pngquant'),
      jpeg        = require('imagemin-jpegtran'),
      svg         = require('imagemin-svgo'),
    portfinder  = require('portfinder'),
    browserSync = require('browser-sync'),
      reload      = browserSync.reload;

// Ресурсы проекта
var paths = {
  img: 'assets/img/',
  styles: 'assets/source/styles/',
  css: 'assets/css/',
  scripts: 'assets/source/scripts/',
  js: 'assets/js/',
  templates: 'templates/',
  html: ''
};

// Одноразовая сборка проекта
gulp.task('default', function() {
  gulp.start('slim', 'styles', 'scripts', 'imgmin');
});

// Запуск живой сборки
gulp.task('live', function() {
  gulp.start('server', 'slim', 'styles', 'scripts', 'imgmin', 'watch');
});

// Туннель
/*gulp.task('external-world', function() {
  gulp.start('web-server', 'slim', 'styles', 'scripts', 'watch');
});*/

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  gulp.watch(paths.styles + '*.css', ['styles']);
  gulp.watch(paths.scripts + '*.js', ['scripts']);
  gulp.watch(paths.templates + '*.slim', ['slim', 'html']);
  gulp.watch(paths.templates + 'blocks/*.slim', ['slim', 'html']);
});

// Шаблонизация
gulp.task('slim', function() {
  return gulp.src(paths.templates + '*.slim')
    .pipe(slim({
      pretty: true,
      require: 'slim/include',
      options: 'include_dirs=["./templates/blocks"]'
    }))
    .pipe(gulp.dest(paths.html))
});

// Картинки
gulp.task('imgmin', function () {
  return gulp.src(paths.img + '*')
    .pipe(imagemin({
        progressive: true,
        use: [jpeg(), png(), svg()]
    }))
    .pipe(gulp.dest(paths.img))
});

// Компиляция стилей, добавление префиксов
gulp.task('styles', function () {
  var processors = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-clearfix'),
    require('postcss-focus'),
    require('postcss-assets', { cachebuster: true }),
    require('postcss-color-alpha'),
    require('postcss-color-function'),
    require('postcss-inline-svg'),
    require('postcss-calc'),
    require('postcss-size'),
    require('postcss-easings'),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('postcss-will-change'),
    require('autoprefixer', { browsers: ['last 2 versions', 'ie 10'] })
  ];
  var cssnano = require('cssnano');

  return gulp.src(paths.styles + 'base.css')
  .pipe(postcss(processors))
  .pipe(rename('style.css'))
  .pipe(gulp.dest(paths.css))
  .pipe(postcss([cssnano({discardComments: {removeAll: true}})]))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(paths.css))
  .pipe(reload({stream: true}));
});

// Сборка и минификация скриптов
gulp.task('scripts', function() {
  return gulp.src(paths.scripts + '*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest(paths.js))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(paths.js))
  .pipe(reload({stream: true}));
});

// Запуск локального сервера
gulp.task('server', function() {
  portfinder.getPort(function (err, port){
    browserSync({
      server: {
        baseDir: "."
      },
      host: 'localhost',
      notify: false,
      port: port
    });
  });
});

// Запуск локального сервера c туннелем
gulp.task('web-server', function() {
  portfinder.getPort(function (err, port){
    browserSync({
      server: {
        baseDir: "."
      },
      tunnel: true,
      host: 'localhost',
      notify: false,
      port: port
    });
  });
});

// Рефреш ХТМЛ-страниц
gulp.task('html', function () {
  gulp.src(paths.html + '*.html')
  .pipe(reload({stream: true}));
});

// Ошибки
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
