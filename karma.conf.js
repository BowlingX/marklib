module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            'src/test/**/*.js',
            {
                pattern: 'src/test/fixtures/**/*.html',
                watched: true,
                included: false,
                served: true
            }
        ],
        frameworks: ['jasmine-jquery', 'jasmine'],
        browsers: ['Chrome'],
        preprocessors: {'./src/**/*.js': ['webpack']},
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: 'reports',
            reporters: [
                { type: 'lcov', subdir: 'report-lcov' }
            ]
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-jquery',
            'karma-junit-reporter',
            'karma-coverage',
            require("karma-webpack")
        ],
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        webpack: require('./webpack.test.config.js')
    });
};