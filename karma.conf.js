module.exports = function(config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],
        files: [
            'build/**/*.spec.js'
        ],
        preprocessors: {
            'build/**/*.js': ['browserify']
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
        logLevel: config.LOG_INFO
    });
};
