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
    htmlmin    = require('gulp-htmlmin'),
    minifyCss  = require('gulp-minify-css'),
    sass       = require('gulp-sass'),
    source     = require('vinyl-source-stream'),
    uglify     = require('gulp-uglify');


////////////////////////////////////////////////////////////////////////////////
// Paths                                                                      //
////////////////////////////////////////////////////////////////////////////////

var paths = {
    src_html    : 'src/index.html',
    src_js      : 'src/script.js',
    src_scripts : 'src/**/*.js',
    src_scss    : 'src/styles/**/*.scss',

    dest        : 'build/',
    dest_files  : 'build/**/*',
};


////////////////////////////////////////////////////////////////////////////////
// Gulp tasks                                                                 //
////////////////////////////////////////////////////////////////////////////////

// Delete generated files
gulp.task('clean', function () {
    del.sync(paths.dest, { force: true });
});

// Process main HTML file
gulp.task('html', function () {
    return gulp.src(paths.src_html)
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(gulp.dest(paths.dest));
});

// Process SCSS files
gulp.task('scss', function () {
    return gulp.src(paths.src_scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.dest));
});

// Process JS files
gulp.task('js', function () {
    return browserify(paths.src_js)
        .transform(babel)
        .bundle()
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest));
});

// Default task: compile files
gulp.task('default', ['clean', 'html', 'scss', 'js']);

// Compile files and recompile on changes
gulp.task('watch', ['default'], function () {
    gulp.watch(paths.src_html, ['html']);
    gulp.watch(paths.src_scss, ['scss']);
    gulp.watch(paths.src_scripts, ['js']);
});

// Deploy to GitHub Pages
gulp.task('deploy', ['default'], function () {
    return gulp.src(paths.dest_files)
        .pipe(ghPages());
});
