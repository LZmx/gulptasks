'use strict';

const Gulp = require('gulp');
const BrowserSync = require('browser-sync');
const Reload = BrowserSync.reload;
const Nodemon = require('gulp-nodemon');

// Add browser-sync and REload into watch task for node projects
Gulp.task('watch', () => {

    Gulp.watch('./img/**/*.*', ['assets']);
    Gulp.watch('./less/**/*.less', ['less']);
    Gulp.watch('./js/**/*.js', ['scripts']);

});
