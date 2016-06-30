const _ = require('lodash');

exports.convertResultsToTimeArrayFormat = (DataFormattedResults) => {
  return DataFormattedResults.map(test => {
    const timesByVersionAndType = {};
    const data = test.data;
    for (const versionAndType in data) {
      const mappedTestData = data[versionAndType].map(event => event.time);
      timesByVersionAndType[versionAndType.slice(0, -4)] = mappedTestData;
    }
    return {
      testName: test.testName,
      testId: test.testId,
      data: timesByVersionAndType,
    };
  });
};

exports.sort = (input) => {
  return input.sort((a, b) => {
    a.testId > b.testId ? 1 : a.testId < b.testId ? -1 : 0;
  });
};

exports.combineDashData = (chartData, statsData) => {
  return _.map(chartData, (item, index) => {
    return _.assignIn(chartData[index], statsData[index]);
  });
};
