const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

/*
  -- TOP LEVEL FUNCTIONS 
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Copy All HTML files
gulp.task('copyHtml', async function () {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('sass', async function () {
  var plugins = [
    autoprefixer({ overrideBrowserslist: ['last 4 version'] }),
    cssnano(),
  ];
  return gulp
    .src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', async function () {
  gulp
    .src('src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist/js'));
});

// npm run gulp
gulp.task('default', gulp.series('sass', 'scripts', 'copyHtml'));

// npm run gulp-watch (auto-compiles on save)
gulp.task('watch', function () {
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
});
