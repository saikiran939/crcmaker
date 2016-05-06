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
const clean = () => del(paths.dest, { force: true });
export { clean };

// Process main HTML file
export function html () {
  return gulp.src(paths.src_html)
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(paths.dest));
}

// Process SCSS files
export function scss () {
  return gulp.src(paths.src_scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest(paths.dest));
}

// Process JS files
export function js () {
  return browserify(paths.src_js)
    .transform(babelify, {
      presets: ['es2015', 'react'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy']
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
}

// Build all files
const build = gulp.series(clean, html, scss, js);
export { build };

// Compile files and recompile on changes
const watch = gulp.series(build, () => {
  browserSync.create().init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch(paths.src_html, html);
  gulp.watch(paths.src_scss, scss);
  gulp.watch(paths.src_js_all, js);
});
export { watch };

export function prod (done) {
  process.env.NODE_ENV = 'production';
  done();
}

// Deploy to GitHub Pages
const deploy = gulp.series(prod, build, () => {
  return gulp.src(paths.dest_files)
    .pipe(ghPages());
});
export { deploy };

// Export default task
export default build;
