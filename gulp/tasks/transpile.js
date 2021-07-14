const gulp     = require('gulp');
const pleeease = require('gulp-pleeease');
const plumber  = require('gulp-plumber');
const rename   = require('gulp-rename');
const webpack  = require('gulp-webpack');
const config   = require('../config');

gulp.task('transpile', function() {
  gulp.src(config.js_src)
    .pipe(plumber())
    .pipe(webpack(config.webpack))
    .pipe(gulp.dest(config.js_dest))
});
