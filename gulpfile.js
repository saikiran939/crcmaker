'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////

var babel      = require('babelify'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    del        = require('del'),
    ghPages    = require('gulp-gh-pages'),
    gulp       = require('gulp'),
    minifyCss  = require('gulp-minify-css'),
    sass       = require('gulp-sass'),
    source     = require('vinyl-source-stream'),
    uglify     = require('gulp-uglify'),
    watchify   = require('watchify');


////////////////////////////////////////////////////////////////////////////////
// Paths                                                                      //
////////////////////////////////////////////////////////////////////////////////
///
var paths = {
  src      : './src/index.html',
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
      .pipe(uglify())
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

// Copy main index files
gulp.task('copy', function () {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));
});

// Process SCSS files
gulp.task('scss', function () {
  return gulp.src(paths.src_scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dest));
});

// Compile files
gulp.task('build', ['clean', 'copy', 'scss'], function () { return compile(); });

// Compile files and recompile on changes
gulp.task('watch', ['clean', 'copy', 'scss'], function () {
  gulp.watch(paths.src, ['copy']);
  gulp.watch(paths.src_scss, ['scss']);
  return watch();
});

// Deploy to GitHub Pages
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// Default: watch task
gulp.task('default', ['watch']);
