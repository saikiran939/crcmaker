'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////

var babelify   = require('babelify'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    del        = require('del'),
    ghPages    = require('gulp-gh-pages'),
    gulp       = require('gulp'),
    htmlmin    = require('gulp-htmlmin'),
    minifyCss  = require('gulp-minify-css'),
    sass       = require('gulp-sass'),
    source     = require('vinyl-source-stream'),
    uglify     = require('gulp-uglify'),
    watchify   = require('watchify');


////////////////////////////////////////////////////////////////////////////////
// Paths                                                                      //
////////////////////////////////////////////////////////////////////////////////

var paths = {
    src_html   : './src/index.html',
    src_js     : './src/index.js',
    src_scss   : './src/styles/**/*.scss',

    dest       : './build/',
    dest_files : './build/**/*',
};


////////////////////////////////////////////////////////////////////////////////
// JS compilers                                                               //
////////////////////////////////////////////////////////////////////////////////

var compile = function (watch) {
    var bundler = watchify(browserify(paths.src_js, { debug: true })
        .transform(babelify));

    var rebundle = function () {
        console.log('> Bundling...');

        bundler.bundle()
            .on('error', function (err) { console.error(err); this.emit('end'); })
            .pipe(source('script.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(paths.dest))
            .on('end', function () { console.log('> Done bundling'); });
    };

    if (watch) {
        bundler.on('update', function() {
            rebundle();
        });
    }

    rebundle();
};

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

// Default task: compile files
gulp.task('default', ['clean', 'html', 'scss'], function () {
    return compile();
});

// Compile files and recompile on changes
gulp.task('watch', ['clean', 'html', 'scss'], function () {
    gulp.watch(paths.src_html, ['html']);
    gulp.watch(paths.src_scss, ['scss']);
    return watch();
});

// Deploy to GitHub Pages
gulp.task('deploy', ['default'], function () {
    return gulp.src(paths.dest_files)
        .pipe(ghPages());
});
