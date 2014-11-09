//Require Gulp
var gulp = require('gulp');

//Define Plugins
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var notify = require('gulp-notify');
var cleanhtml = require('gulp-cleanhtml');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('sass', function() {
  gulp.src('_core/stylesheets/*.scss')
    .pipe(sass({sourcemap: false, style: 'compressed'}))
    // .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('assets/css/'))
    .pipe(reload({stream:true}));
});

gulp.task('handlebars', function(){
  gulp.src(['_core/templates/*.hbs','_core/templates/partials/*.hbs'])
    .pipe(handlebars())
    .pipe(defineModule('node'))
    .pipe(gulp.dest(['./','./partials']));
});

gulp.task('templates', function(){
  gulp.src(['_core/templates/*.hbs','_core/templates/partials/*.hbs'])
      .pipe(cleanhtml())
      .pipe(gulp.dest(''))
      .pipe(reload({stream:true}));
    });

gulp.task('partials', function(){
  gulp.src(['_core/templates/partials/*.hbs'])
      .pipe(cleanhtml())
      .pipe(gulp.dest('./partials'))
      .pipe(reload({stream:true}));
    });

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "http://localhost:2368/"
    });
});

gulp.task('default', ['sass', 'templates', 'partials', 'browser-sync'], function () {
    gulp.watch("_core/stylesheets/*.scss", ['sass']);
    gulp.watch("_core/templates/*.hbs", ['templates']);
    gulp.watch("_core/templates/*/*.hbs", ['partials']);

});