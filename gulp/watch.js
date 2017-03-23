'use strict';

const Gulp = require('gulp');


Gulp.task('watch', () => {

    Gulp.watch('./img/**/*.*', ['assets']);
    Gulp.watch('./less/**/*.less', ['less']);
    Gulp.watch('./js/**/*.js', ['scripts']);

});
