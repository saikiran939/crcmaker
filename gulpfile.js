'use strict';


////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////

var babel      = require('babelify'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    del        = require('del'),
    gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    source     = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    watchify   = require('watchify');


////////////////////////////////////////////////////////////////////////////////
// JS compilers                                                               //
////////////////////////////////////////////////////////////////////////////////

var compile = function (watch) {
  var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));

  var rebundle = function () {
    bundler.bundle()
      .on('error', function (err) { console.error(err); this.emit('end'); })
      .pipe(source('script.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('> Bundling...');
      rebundle();
    });
  }

  rebundle();
}

var watch = function () {
  return compile(true);
};


////////////////////////////////////////////////////////////////////////////////
// Gulp tasks                                                                 //
////////////////////////////////////////////////////////////////////////////////

// Delete generated files
gulp.task('clean', function () {
  del.sync('/build/', { force: true });
});

// Process SCSS files
gulp.task('scss', function () {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});

// Compile files
gulp.task('build', ['scss'], function () { return compile(); });

// Compile files and recompile on changes
gulp.task('watch', ['scss'], function () {
  gulp.watch('./src/styles/*.scss', ['scss']);
  return watch();
});

// Default: watch task
gulp.task('default', ['watch']);
