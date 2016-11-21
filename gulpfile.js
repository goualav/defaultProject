/**
 * Description: Gulpfile.
 * Version: 1.0.0
 * Last update: 2016/11/14
 * Author: Virgile Gouala <vgouala@castelis.com>
 *
 * Summary:
 *
 *  1. Dependencies
 *      A. Tools
 *      B. SCSS / SASS / CSS
 *      C. JavaScript
 *      D. Tools
 *  2. Dependencies' Options
 *  3. Variables
 *  4. Tasks
 *      A. Development
 *      B. Production
 *      C. Uglify
 *      D. Watch
 *  5. Default Task

 */

/* ==========================================================================
   1. Dependencies
   ========================================================================== */
    /* A. Init
    ========================================================================== */
    var gulp = require('gulp');
    /* B. SCSS / SASS / CSS
    ========================================================================== */
    var sass         = require('gulp-sass');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');
    var cleanCSS     = require('gulp-clean-css');
    /* C. JavaScript
    ========================================================================== */
    var uglify = require('gulp-uglify');
    /* D. Tools
    ========================================================================== */
    const rename = require('gulp-rename');
    const size   = require('gulp-size');
/* ==========================================================================
   2. Dependencies' Options
   ========================================================================== */
    var autoprefixerOptions = {
        browsers: ['last 2 versions'],
        cascade : true
    };
    var sassOptions = {
        errLogToConsole: true,
        outputStyle    : 'expanded'
    };
/* ==========================================================================
   3. Variables
   ========================================================================== */
    var inputCss  = './assets/css/scss/**/*.scss';
    var outputCss = './assets/css';
    var inputJs   = './assets/js/**/*.js';
    var outputJs  = './assets/js/';
/* ==========================================================================
   4. Tasks
   ========================================================================== */
   /* A. Developpement
    ========================================================================== */
    gulp.task('sass', function () {
      return gulp
        .src(inputCss)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(size())
        .pipe(gulp.dest(outputCss));
        });
    /* B. Clean
    ========================================================================== */
    gulp.task('clean', function () {
      return gulp
      .src(inputCss)
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(outputCss));
      });

    /* C. Uglify
    ========================================================================== */
    gulp.task('uglify', function () {
        gulp.src(inputJs)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outputJs))
    });
    /* D. Watch
    ========================================================================== */
    gulp.task('watch', function() {
      return gulp
        .watch(inputCss, ['sass'])
        .on('change', function(event) {
          console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
          });
        });
/* ==========================================================================
   5. Default Task
   ========================================================================== */
    gulp.task('default', ['watch']);
    gulp.task('prod', ['clean']);