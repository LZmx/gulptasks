'use strict';

const Gulp = require('gulp');
const BrowserSync = require('browser-sync');
const Reload = BrowserSync.reload;
const Nodemon = require('gulp-nodemon');

Gulp.task('browser-sync', ['nodemon'],() => {

    BrowserSync({
        proxy: "localhost:3000",  // local node app address
        port: 5000,  // use *different* port than above
        notify: true
    });

});