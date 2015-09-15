var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');




// Gulpfile.js
// Require the needed packages
var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  stripDebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber');



// Get and render all .styl files recursively
gulp.task('stylesheets', function () {
  gulp.src('./styl/application.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(stylus())
    .pipe(autoprefixer("last 2 versions", "> 5%", "ie 10", "ie 9"))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

gulp.task('javascripts', function() {

  // guulp
  // build minified javascripts, jquery first
  gulp.src([
    './js-source/lib/jquery-1.11.3.js',
    './js-source/lib/*.js',
    './js-source/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('application.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    // gulp.watch('js/*.js', ['lint', 'scripts']);

    gulp.watch('./styl/*.styl', ['stylesheets']);
    gulp.watch('./styl/*/*.styl', ['stylesheets']);

    gulp.watch(['./js-source/*.js', './js-source/lib/*.js'], ['javascripts']);
    // gulp.watch(, ['javascripts']);

});

gulp.task('build', ['stylesheets', 'javascripts'], function() {

  // build minified javascripts, jquery first
  gulp.src([
    './js/lib/*.js',
    './js/*.js'
  ])
    .pipe(concat('application.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('default', ['stylesheets', 'javascripts', 'watch']);

