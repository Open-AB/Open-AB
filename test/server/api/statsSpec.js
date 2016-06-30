'use strict';

const expect = require('chai').expect;

// api server config
process.env.PORT = 8888;
process.env.NODE_ENV = 'test';
const request = require('supertest')(`http://localhost:${process.env.PORT}`);

const generateEvents = require('../../../server/api/analytics/stats/generateEvents.js');
const chiSquareAnalysis = require('../../../server/api/analytics/stats/chiSquareAnalysis.js');

const defaultParamsForAllTests = generateEvents.defaultParamsForAllTests;
const { aClickRate, aTotalVisits, bClickRate, bTotalVisits } = defaultParamsForAllTests[0].testDetails;

describe('Events generator', () => {

  const test1ATotalVisits = generateEvents.defaultParamsForAllTests[1].testDetails.aTotalVisits;

  describe('Generate full tests data', () => {

    const tests = generateEvents.generateDataForMultipleTestsWithDefaultParams();
    const test = tests[0];
    const testData = test.data;
    const test1 = tests[1];
    const test1Data = test1.data;

    it('should produce tests with the correct name and id', () => {
      expect(test.testName).to.equal('Buy Now Button Test');
      expect(test.testId).to.equal('3874E76');
    });

    it('should generate the right number of visits', () => {
      expect(testData.aVisitsData.length).to.equal(aTotalVisits);
      expect(testData.bVisitsData.length).to.equal(bTotalVisits);
      expect(test1Data.aVisitsData.length).to.equal(test1ATotalVisits);
    });

    it('should probably generate a number of clicks within a certain range', () => {
      expect(testData.aClicksData.length).to.be.within(((aClickRate - 0.25) * aTotalVisits), ((aClickRate + 0.25) * aTotalVisits));
      expect(testData.bClicksData.length).to.be.within(((bClickRate - 0.25) * bTotalVisits), ((bClickRate + 0.25) * bTotalVisits));
    });

    it('should generate visits of the correct format', () => {
      expect(typeof testData.aVisitsData[0].time).to.equal('number');
    });

    it('should generate clicks of the correct format', () => {
      expect(typeof testData.aClicksData[0].time).to.equal('number');
    });
  });

  describe('Generate click and visit times arrays', () => {

    const tests = generateEvents.generateTimesForMultipleTestsWithDefaultParams();
    const testData = tests[0].data;

    it('should generate visits in the correct format', () => {
      expect(typeof testData.aVisits[0]).to.equal('number');
    });

    it('should generate clicks in the correct format', () => {
      expect(typeof testData.aClicks[0]).to.equal('number');
    });
  });
});

describe('Chi Square Significance Analysis', () => {

  // Note that if the test data is changed, some of these tests will break.
  // This is intentional and ensures that appropriate test data is used.
  const sampleSize = 2587;
  const approxEvents = 2587 * 1.01;

  const tests = generateEvents.generateTimesForMultipleTestsWithDefaultParams();
  const results = chiSquareAnalysis.computeStatsForAllTests(tests);

  it('should determine whether sufficient time has elapsed', () => {
    expect(results[0].analysisResults.sufficientTime).to.be.true;
    expect(results[4].analysisResults.sufficientTime).to.be.false;
  });

  it('should determine whether enough users have visited', () => {
    expect(results[0].analysisResults.sufficientVisits).to.be.true;
    expect(results[3].analysisResults.sufficientVisits).to.be.false;
  });

  it('should probably consider a reasonable number of visits', () => {
    expect(results[0].analysisResults.eventsConsidered.aVisitsConsidered).to.be.within(sampleSize, sampleSize * 1.2);
    expect(results[0].analysisResults.eventsConsidered.bVisitsConsidered).to.be.within(sampleSize, sampleSize * 1.2);
    expect(results[1].analysisResults.eventsConsidered.aVisitsConsidered).to.be.within(sampleSize, sampleSize * 1.2);
    expect(results[1].analysisResults.eventsConsidered.bVisitsConsidered).to.be.within(sampleSize, sampleSize * 1.2);
    expect(results[2].analysisResults.eventsConsidered.aVisitsConsidered).to.be.within(sampleSize, sampleSize * 1.2);
    expect(results[2].analysisResults.eventsConsidered.bVisitsConsidered).to.be.within(sampleSize, sampleSize * 1.2);
  });

  it('should probably consider a reasonable number of clicks', () => {
    expect(results[0].analysisResults.eventsConsidered.aClicksConsidered).to.be.within(((aClickRate - 0.30) * approxEvents), ((aClickRate + 0.30) * approxEvents));
    expect(results[0].analysisResults.eventsConsidered.bClicksConsidered).to.be.within(((bClickRate - 0.30) * approxEvents), ((bClickRate + 0.30) * approxEvents));
  });

  it('should probably find a reasonable p value', () => {
    expect(results[0].analysisResults.p).to.be.within(0, 0.05);
    expect(results[2].analysisResults.p).to.be.within(0, 1);
  });
});

describe('Send stats to client', () => {

  it('sends all stats to client', done => {
    request
      .get('/api/stats')
      .expect(200, done());  // TODO: add test to make sure that the contents of the response body are accurate
  });
});
