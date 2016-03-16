'use strict';

// ========================================================================== //
// Dependencies                                                               //
// ========================================================================== //

const babelify  = require('babelify'),
  browserify  = require('browserify'),
  browserSync = require('browser-sync').create(),
  buffer      = require('vinyl-buffer'),
  del         = require('del'),
  ghPages     = require('gulp-gh-pages'),
  gulp        = require('gulp'),
  htmlmin     = require('gulp-htmlmin'),
  nano        = require('gulp-cssnano'),
  sass        = require('gulp-sass'),
  source      = require('vinyl-source-stream'),
  uglify      = require('gulp-uglify');


// ========================================================================== //
// Paths                                                                      //
// ========================================================================== //

const config = {
  development: false
};

const paths = {
  src_html   : 'src/index.html',
  src_js     : 'src/script.js',
  src_js_all : 'src/**/*.js',
  src_scss   : 'src/styles/**/*.scss',

  dest       : 'build/',
  dest_files : 'build/**/*',
};


// ========================================================================== //
// Gulp tasks                                                                 //
// ========================================================================== //

// Delete generated files
gulp.task('clean', (cb) => {
  del.sync(paths.dest, { force: true });
  cb();
});

// Process main HTML file
gulp.task('html', () => {
  return gulp.src(paths.src_html)
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(paths.dest));
});

// Process SCSS files
gulp.task('scss', () => {
  return gulp.src(paths.src_scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest(paths.dest));
});

// Process JS files
gulp.task('js', () => {
  return browserify(paths.src_js)
    .transform(babelify, {
      presets: ['es2015', 'react'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy'],
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
});

// Default task: compile files
gulp.task('default', ['clean', 'html', 'scss', 'js']);

// Compile files and recompile on changes
gulp.task('watch', ['default'], () => {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch(paths.src_html, ['html']);
  gulp.watch(paths.src_scss, ['scss']);
  gulp.watch(paths.src_js_all, ['js']);
});

// Deploy to GitHub Pages
gulp.task('deploy', ['default'], () => {
  return gulp.src(paths.dest_files)
    .pipe(ghPages());
});
