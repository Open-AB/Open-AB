const formatProportion = (a, b) => {
  const proportion = a / b;
  const toRound = proportion * 10000;
  const rounded = Math.round(toRound);
  return rounded / 100;
};

module.exports = statsForAllTests => {
  return statsForAllTests.map(statsForTest => {
    const { testName, testId, analysisResults } = statsForTest;
    const { sufficientTime, sufficientVisits, eventsConsidered, p } = analysisResults;
    const aConversionRateNumber = formatProportion(eventsConsidered.aClicksConsidered, eventsConsidered.aVisitsConsidered);
    const bConversionRateNumber = formatProportion(eventsConsidered.bClicksConsidered, eventsConsidered.bVisitsConsidered);
    let testResult;
    let aConversionRate = '--';
    let bConversionRate = '--';

    if (!sufficientTime) {
      testResult = 'Test has not run long enough (must run for at least one week)';
    } else if (!sufficientVisits) {
      testResult = 'Not yet enough visitors';
    } else if (p > 0.05) {
      testResult = 'Test was inconclusive';
    } else {
      aConversionRate = `${String(aConversionRateNumber)}%`;
      bConversionRate = `${String(bConversionRateNumber)}%`;
      if (aConversionRateNumber > bConversionRateNumber) {
        testResult = 'Version A wins!';
      } else {
        testResult = 'Version B wins!';
      }
    }

    const viewableAnalysisResults = { testResult, aConversionRate, bConversionRate };
    return { testName, testId, viewableAnalysisResults };
  });
};
