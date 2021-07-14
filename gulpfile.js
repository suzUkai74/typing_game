const gulp       = require('gulp');
const requireDir = require('require-dir');
const config     = require('./gulp/config');
const webserver  = require('gulp-webserver');

requireDir('./gulp/tasks', { recurse: true });

gulp.task('watch', function() {
  gulp.watch(config.sass_src[0], ['sass']);
  gulp.watch(config.js_src, ['transpile']);
  gulp.watch(config.pug_src[0], ['pug']);
});

gulp.task('server', function() {
  gulp.src(config.dest)
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true,
    }));
});

gulp.task('deploy_build', ['sass', 'transpile', 'pug_deploy_build'])
gulp.task('default', ['pug', 'sass', 'transpile', 'watch', 'server']);
