const gulp      = require('gulp');
const gulpIf    = require('gulp-if');
const pug       = require('gulp-pug');
const plumber   = require('gulp-plumber');
const config    = require('../config');
const minimist  = require('minimist');
const envOption = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'development' }
};
const options      = minimist(process.argv.slice(2), envOption);

gulp.task('pug', function() {
  gulp.src(config.pug_src)
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      locals: { environment: 'development' }
    }))
    .pipe(gulp.dest(config.dest));
});

gulp.task('pug_deploy_build', function() {
  gulp.src(config.pug_src)
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      locals: { environment: options.env }
    }))
    .pipe(gulp.dest(config.build));
});
