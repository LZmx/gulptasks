'use strict';

const Gulp = require('gulp');
const Path = require('path');
const Merge = require('merge-stream');


Gulp.task('assets', () => {

    const images = Gulp.src('./img/**/*')
        .pipe(Gulp.dest(Path.join('./build', 'img')));

    const fonts = Gulp.src('./node_modules/font-awesome/fonts/**')
        .pipe(Gulp.dest(Path.join('./build', 'fonts')));

    return Merge(images, fonts);
});
