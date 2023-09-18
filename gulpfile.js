const gulp = require('gulp');
const { parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const watch = require('watch');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const minifyJs = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');

function buildStyle() {
  return gulp.src('./theme/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename("style.css"))
    .pipe(gulp.dest('./public/resources/css'));
}

function imageMin(){
  return gulp.src('./images/*.{jpg,png,svg}')
  .pipe(imagemin())
  .pipe(gulp.dest('./public/resources/img'));
}
function js(){
  return gulp.src('./theme/main.js')
  .pipe(minifyJs())
  .pipe(gulp.dest('./public/resources/js'));
}

function watchAll() {
  gulp.watch('./public/resources/index.html', browsersyncReload);
  gulp.watch('./theme/**/*.scss', series(buildStyle, browsersyncReload));
  gulp.watch('./theme/**/*.js', series(js, browsersyncReload));
  gulp.watch('./images/**/*.{jpg,png,svg}', series(imageMin, browsersyncReload));
}

function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

exports.dev = series(browsersyncServe, watchAll);
exports.build = parallel(buildStyle, js, imageMin);
