/*
 * Build file for FlexCSS
 * @author David Heidrich (me@bowlingx.com)
 */

var gulp = require('gulp');

// serve all plugins under $ and remove gulp prefix
var $ = require('gulp-load-plugins')({
    replaceString: /^gulp(-|\.)([0-9]+)?/
});

// other Libraries
var
    del = require('del'),
    autoprefixer = require('autoprefixer-core'),
    argv = require('yargs').argv,
    csswring = require('csswring'),
    webpackConfig = require("./webpack.config.js");

var sass = require('gulp-sass');

var paths = {
    exports: ['src/export.js'],
    tests: ['src/test/**/*.js'],
    images: ['assets/img/**/*', 'themes/img/**/*'],
    fonts: 'assets/fonts/**/*',
    sassThemes: 'examples/**/*.scss',
    sassLib: 'assets/**/*.scss',
    // Karma config file
    karmaConfig: 'karma.conf.js'
};

var onError = function (err) {
    $.util.beep();
    console.log(err);
    // continue:
    this.emit('end');
};

// cleans build directory
gulp.task('clean', function (cb) {
    del(['build'], cb);
});

function createScripts(watch) {
    var path = require("path");

    var config = Object.create(webpackConfig);
    config.watch = watch;
    return gulp.src(paths.exports)
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.webpack(config))
        .pipe(gulp.dest('build/js'))
}

gulp.task('compileScriptsWithDependencies', ['clean'], function () {
    return createScripts(false);
});

gulp.task('watchScriptsWithDependencies', ['clean'], function () {
    return createScripts(true);
});

// setup tests
gulp.task('test', function () {
    return gulp.src('./doesNotExists')
        .pipe($.karma({
            configFile: paths.karmaConfig,
            action: argv.watch ? 'watch' : 'run',
            reporters: argv.writeTestResults ? ['progress', 'junit', 'coverage'] : ['progress', 'coverage']
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            $.util.beep();
            throw err;
        });
});


// Copy all static images
gulp.task('images', ['clean'], function () {
    return gulp.start('imagesReload');
});

gulp.task('imagesReload', function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe($.imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
});

gulp.task('fonts', ['clean'], function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('sass', ['clean'], function () {
    return gulp.start('compileSass');
});

gulp.task('compileSass', function () {
    var processors = [
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        csswring
    ];

    return gulp.src(paths.sassThemes)
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.postcss(processors))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    // scripts and images
    // sass
    gulp.watch(paths.sassThemes, ['compileSass']);
    gulp.watch(paths.sassLib, ['compileSass']);
    gulp.watch(paths.images, ['imagesReload']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'fonts', 'images', 'sass', 'watchScriptsWithDependencies']);

gulp.task('dist', ['fonts', 'images', 'sass', 'compileScriptsWithDependencies']);