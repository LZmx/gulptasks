'use strict';

const Path = require('path');
const Gulp = require('gulp');
const Newer = require('gulp-newer');
const Concat = require('gulp-concat');
const Less = require('gulp-less');
const AutoPrefix = require('gulp-autoprefixer');
const Nano = require('gulp-cssnano');
const GulpIf = require('gulp-if');
const Rev = require('gulp-rev');
const Args = require('yargs').argv;
const Notify = require('gulp-notify');
const Plumber = require('gulp-plumber');

var onError = function (err) {
  console.log(err);
  this.emit('end');
};

var apConfig = {
    browsers: [
        'last 5 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
    ],
    cascade: false,
    add: true
};

Gulp.task('less', () => {

    const bundleConfigs = [{
        entries: [
            './less/app.less'
        ],
        dest: './build/css',
        outputName: 'app.css'
    }];

    return bundleConfigs.map((bundleConfig) => {

        return Gulp.src(bundleConfig.entries)
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Less())
            .pipe(Plumber({
                errorHandler: onError
            }))
            .pipe(AutoPrefix(apConfig))
            .pipe(GulpIf(Args.env == 'prod', Nano({autoprefixer:false})))
            .pipe(Rev())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(Rev.manifest())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(GulpIf(Args.env != 'prod', Notify({
                'title': 'Less!',
                'message': 'Build Complete'
            })));
    });
});
