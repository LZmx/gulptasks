'use strict';

const Gulp = require('gulp');
const Nodemon = require('gulp-nodemon');

Gulp.task('nodemon', (cb) => {

    var called = false;
    return Nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    })
    .on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    })
    .on('restart', function () {
        setTimeout(function () {
            reload({ stream: false });
        }, 1000);
    });

});