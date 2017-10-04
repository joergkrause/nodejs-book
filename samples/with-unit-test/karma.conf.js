module.exports = function(config) {
  config.set({
    basePath: '.',
    files: [
      'parser/**/*.[Ss]pec.js'
    ],
    frameworks: ['jasmine'],
    autoWatch: true,
    autoWatchBatchDelay: 1000,

  });
};
