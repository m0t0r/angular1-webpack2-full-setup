// Karma configuration
process.env.BABEL_ENV = 'test';

const webpackConfig = require('./webpack.config.babel')({test: true});

const fileGlob = 'src/**/*.spec.js';
const srcGlob = 'src/**/!(*.test|*.spec).js';
const vendorGlob = [
  'node_modules/angular/angular.js',
  'node_modules/angular-mocks/angular-mocks.js',
  'node_modules/angular-aria/angular-aria.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/oclazyload/dist/ocLazyLoad.js'
];

module.exports = config => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      ...vendorGlob,
      srcGlob,
      {pattern: fileGlob, watched: false}
    ],


    // list of files to exclude
    exclude: [ ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [fileGlob]: ['webpack'],
      [srcGlob]: ['webpack']
    },

    // webpack config

    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'},
      ],
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
