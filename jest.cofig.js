module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
  };

  module.exports = {
    reporters: [
      "default",
      [
        "jest-stare",
        {
          resultDir: "jest-stare",
          reportTitle: "Test Report",
          additionalResultsProcessors: [],
          coverageLink: "../coverage/lcov-report/index.html"
        }
      ]
    ]
  };
  