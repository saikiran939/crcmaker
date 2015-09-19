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
    watchify   = require('watchify');


var paths = {
  src_js   : './src/index.js',
  src_scss : './src/styles/**/*.scss',
  dest     : './build/'
};

////////////////////////////////////////////////////////////////////////////////
// JS compilers                                                               //
////////////////////////////////////////////////////////////////////////////////

var compile = function (watch) {
  var bundler = watchify(browserify(paths.src_js, { debug: true }).transform(babel));

  var rebundle = function () {
    bundler.bundle()
      .on('error', function (err) { console.error(err); this.emit('end'); })
      .pipe(source('script.js'))
      .pipe(buffer())
      .pipe(gulp.dest(paths.dest));
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
  del.sync(paths.dest, { force: true });
});

// Process SCSS files
gulp.task('scss', function () {
  return gulp.src(paths.src_scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dest));
});

// Compile files
gulp.task('build', ['scss'], function () { return compile(); });

// Compile files and recompile on changes
gulp.task('watch', ['scss'], function () {
  gulp.watch(paths.src_scss, ['scss']);
  return watch();
});

// Default: watch task
gulp.task('default', ['watch']);
