'use strict';

const Path = require('path');
const Gulp = require('gulp');
const Newer = require('gulp-newer');
const Concat = require('gulp-concat');
const Sass = require('gulp-sass');
const AutoPrefix = require('gulp-autoprefixer');
const Nano = require('gulp-cssnano');
const GulpIf = require('gulp-if');
const Rev = require('gulp-rev');
const Args = require('yargs').argv;
const Notify = require('gulp-notify');

Gulp.task('sass', () => {

    const bundleConfigs = [{
        entries: [
            './sass/app.scss'
        ],
        dest: './build/css',
        outputName: 'app.css'
    }];

    return bundleConfigs.map((bundleConfig) => {

        return Gulp.src(bundleConfig.entries)
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Sass())
            .pipe(AutoPrefix({
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
            }))
            .pipe(GulpIf(Args.env == 'prod', Nano({autoprefixer:false})))
            .pipe(Rev())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(Rev.manifest())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(GulpIf(Args.env != 'prod', Notify({
                'title': 'Sass',
                'message': 'Build Complete'
            })));
    });
});
