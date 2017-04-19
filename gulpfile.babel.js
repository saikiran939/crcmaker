import babelify from 'babelify';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import buffer from 'vinyl-buffer';
import del from 'del';
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import nano from 'gulp-cssnano';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';


// ========================================================================== //
// Configuration                                                              //
// ========================================================================== //

const PATHS = {
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
export const clean = () => del(PATHS.dest, { force: true });

// Process main HTML file
export function html () {
  return gulp.src(PATHS.src_html)
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(PATHS.dest));
}

// Process SCSS files
export function scss () {
  return gulp.src(PATHS.src_scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest(PATHS.dest));
}

// Process JS files
export function js () {
  return browserify(PATHS.src_js)
    .transform(babelify, {
      presets: ['env', 'react'],
      plugins: ['transform-class-properties']
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(PATHS.dest));
}

// Build all files
export const build = gulp.series(clean, html, scss, js);

// Build all files in prod mode
export const build_prod = gulp.series(prod, clean, html, scss, js);

// Compile files and recompile on changes
export const watch = gulp.series(build, () => {
  browserSync.create().init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch(PATHS.src_html, html);
  gulp.watch(PATHS.src_scss, scss);
  gulp.watch(PATHS.src_js_all, js);
});

export function prod (done) {
  process.env.NODE_ENV = 'production';
  done();
}

// Deploy to GitHub Pages
export const deploy = gulp.series(build_prod, () => gulp.src(PATHS.dest_files).pipe(ghPages()));

// Export default task
export default build;
