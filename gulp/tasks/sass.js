const gulp     = require('gulp');
const sass     = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const pleeease = require('gulp-pleeease');
const plumber  = require('gulp-plumber');
const rename   = require('gulp-rename');
const config   = require('../config');

gulp.task('sass', function() {
  gulp.src(config.sass_src)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(pleeease({
      sass: true,
      autoprefixer: true,
      minifier: false,
      mqpacker: true
    }))
    .pipe(gulp.dest(config.sass_dest));
});
