// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: getFrameworks(),
    plugins: getPlugins(),
    client: getClient(),
    files: getFiles(),
    preprocessors: getPreprocessors(),
    mime: getMime(),
    coverageIstanbulReporter: istanbulReporter(),
    angularCli: ngCli(),
    reporters: getReporters(config),
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: getBrowsers(),
    singleRun: false
  });
};

function getFrameworks() {
  return ['jasmine', '@angular/cli'];
}

function getPlugins() {
  return [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-html-reporter'),
    require('karma-coverage-istanbul-reporter'),
    require('@angular/cli/plugins/karma')
  ];
}

function getClient() {
  return {
    clearContext: false // leave Jasmine Spec Runner output visible in browser
  };
}

function getFiles() {
  return [{pattern: './src/test.ts', watched: false}];
}

function getPreprocessors() {
  return {'./src/test.ts': ['@angular/cli']};
}

function getMime() {
  return {'text/x-typescript': ['ts', 'tsx']};
}

function istanbulReporter() {
  return {reports: ['html', 'lcovonly'], fixWebpackSourcePaths: true};
}

function ngCli() {
  return {environment: 'dev'};
}

function getReporters(config) {
  return config.angularCli && config.angularCli.codeCoverage ? ['progress', 'coverage-istanbul'] : ['progress', 'kjhtml'];
}

function getBrowsers() {
  return ['Chrome'];
}
