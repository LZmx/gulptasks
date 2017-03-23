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
        outputName: 'vendor.js'
    }, {
        entries: './js/app.js',
        dest: './build/js',
        outputName: 'app.js'
    }];

    return bundleConfigs.map((bundleConfig) => {

        return Gulp.src(bundleConfig.entries)
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(GulpIf(bundleConfig.outputName == 'app.js', Jshint()))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(GulpIf(Args.env == 'prod' && bundleConfig.outputName == 'app.js', Uglify()))
            .pipe(Rev())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(Rev.manifest())
            .pipe(Gulp.dest(bundleConfig.dest))
            .pipe(GulpIf(Args.env != 'prod', Notify({
                'title': 'Scripts',
                'message': 'Build Complete'
            })));
    });
});
