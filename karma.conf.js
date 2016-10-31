module.exports = function (config) {

    config.set({
        basePath: 'build/',
        frameworks: ['browserify', 'jasmine'],
        files: [
            '**/*.spec.js'
        ],
        preprocessors: {
            '**/*.js': ['browserify']
        },
        browserify: {
            debug: true
        },
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-browserify',
            'karma-spec-reporter'
        ],
        reporters: ['spec'],
        browsers: ['PhantomJS'],
        singleRun: true,
        logLevel: config.LOG_INFO,
    });
};