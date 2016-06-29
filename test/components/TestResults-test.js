const expect = require('expect');

import formatStats from '../../client/formatStats.js';
// import generateEvents from '../../server/api/analytics/stats/generateEvents.js';
// import chiSquareAnalysis from '../../server/api/analytics/stats/chiSquareAnalysis.js';

/*eslint-disable */

const statsForAllTests = [
  {
    "testName": "Buy Now Button Test",
    "testId": "3874E76",
    "analysisResults": {
      "sufficientTime": true,
      "sufficientVisits": true,
      "eventsConsidered": {
        "aVisitsConsidered": 2587,
        "aClicksConsidered": 260,
        "bVisitsConsidered": 2627,
        "bClicksConsidered": 544
      },
      "p": 0
    }
  },
  {
    "testName": "Try Now Button Test",
    "testId": "hgU9084K",
    "analysisResults": {
      "sufficientTime": true,
      "sufficientVisits": true,
      "eventsConsidered": {
        "aVisitsConsidered": 2587,
        "aClicksConsidered": 1300,
        "bVisitsConsidered": 2631,
        "bClicksConsidered": 833
      },
      "p": 0
    }
  },
  {
    "testName": "Subscribe Now Button Test",
    "testId": "sd37489",
    "analysisResults": {
      "sufficientTime": true,
      "sufficientVisits": true,
      "eventsConsidered": {
        "aVisitsConsidered": 2610,
        "aClicksConsidered": 561,
        "bVisitsConsidered": 2587,
        "bClicksConsidered": 500
      },
      "p": 0.05266609814543577
    }
  },
  {
    "testName": "Act Now Button Test",
    "testId": "asdas5489",
    "analysisResults": {
      "sufficientTime": true,
      "sufficientVisits": false,
      "eventsConsidered": {
        "aVisitsConsidered": 2590,
        "aClicksConsidered": 256,
        "bVisitsConsidered": 2580,
        "bClicksConsidered": 786
      }
    }
  },
  {
    "testName": "Signup Now Button Test",
    "testId": "kjhghj876H",
    "analysisResults": {
      "sufficientTime": false,
      "sufficientVisits": true,
      "eventsConsidered": {
        "aVisitsConsidered": 2637,
        "aClicksConsidered": 571,
        "bVisitsConsidered": 2588,
        "bClicksConsidered": 1055
      },
      "p": 0
    }
  }
]

/*eslint-enable */

describe('Format stats', () => {

  // const tests = generateEvents.generateTimesForMultipleTests();
  // const stats = chiSquareAnalysis.computeStatsForTests(tests);
  const viewableStats = formatStats(statsForAllTests);

  it('should return correct test results', () => {
    expect(viewableStats[0].viewableAnalysisResults.testResult).toBe('B wins!');
    expect(viewableStats[1].viewableAnalysisResults.testResult).toBe('A wins!');
    expect(viewableStats[2].viewableAnalysisResults.testResult).toBe('Test was inconclusive');
    expect(viewableStats[3].viewableAnalysisResults.testResult).toBe('Not yet enough visitors');
    expect(viewableStats[4].viewableAnalysisResults.testResult).toBe('Test has not yet run long enough (must run for at least one week)');
  });

  it('should return no conversion rates for incomplete and inconclusive tests', () => {
    expect(viewableStats[2].viewableAnalysisResults.aConversionRate).toBe('--');
    expect(viewableStats[3].viewableAnalysisResults.aConversionRate).toBe('--');
    expect(viewableStats[4].viewableAnalysisResults.aConversionRate).toBe('--');
  });

  it('should properly format conversion rates', () =>  {
    expect(viewableStats[0].viewableAnalysisResults.aConversionRate).toBe('10.05%');
    expect(viewableStats[0].viewableAnalysisResults.bConversionRate).toBe('20.71%');
  });

});
