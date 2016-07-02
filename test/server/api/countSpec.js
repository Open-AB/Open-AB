'use strict';

const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

const generateEvents = require('../../../server/api/analytics/stats/generateEvents.js');

const count = require('../../../server/api/analytics/stats/count.js');

describe('Click Count Functions', () => {
  const data = generateEvents.generateTimesForMultipleTestsWithDefaultParams()[0];
  const aClicks = data.data.aClicks;
  const bClicks = data.data.bClicks;
  const aVisits = data.data.aVisits;
  const bVisits = data.data.bVisits;

    it('Bucket counts should sum correctly', () => {
      const countResults = count.processSingleTestDataIntoResults(aClicks, bClicks, aVisits, bVisits);

      const countClicksA = countResults.aClicks.reduce((acc, curr) => acc + curr, 0);
      const countClicksB = countResults.bClicks.reduce((acc, curr) => acc + curr, 0);

      const countVisitsA = countResults.aVisits.reduce((acc, curr) => acc + curr, 0);
      const countVisitsB = countResults.bVisits.reduce((acc, curr) => acc + curr, 0);

      expect(countClicksA).to.equal(aClicks.length);
      expect(countVisitsA).to.equal(aVisits.length);

      expect(countClicksB).to.equal(bClicks.length);
      expect(countVisitsB).to.equal(bVisits.length);
    });
});
