'use strict';

const Gulp = require('gulp');
const Path = require('path');
const Newer = require('gulp-newer');
const Concat = require('gulp-concat');
const Uglify = require('gulp-uglify');
const Jshint = require('gulp-jshint');
const GulpIf = require('gulp-if');
const Rev = require('gulp-rev');
const Args = require('yargs').argv;
const Notify = require('gulp-notify');

Gulp.task('scripts', () => {

    const bundleConfigs = [{
        /** Library Files that doesn't need to be touched
         * Adjust boostrap path for less or sass version 
        */
        entries: [
        	'./node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: './build/js',
        check: false,
        outputName: 'vendor.js'
    }, {
        entries: './js/app.js',
        dest: './build/js',
        check: true,
        outputName: 'app.js'
    }];

    return bundleConfigs.map((bundleConfig) => {

        return Gulp.src(bundleConfig.entries)
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Jshint())
            .pipe(GulpIf(bundleConfig.check, Jshint.reporter('default')))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(GulpIf(Args.env == 'prod' && bundleConfig.check, Uglify()))
            .pipe(Rev())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(Rev.manifest())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(GulpIf(Args.env != 'prod', Notify({
                'title': 'Scripts',
                'message': 'Build '+bundleConfig.outputName+' Complete'
            })));
    });
});
