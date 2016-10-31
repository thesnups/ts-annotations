module.exports = function (config) {

    const configuration = {
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
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-browserify',
            'karma-spec-reporter'
        ],
        reporters: ['spec'],
        browsers: ['Chrome'],
        singleRun: true,
        logLevel: config.LOG_INFO,
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};