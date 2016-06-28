'use strict';

const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

const generateEvents = require('../../../server/api/analytics/stats/generateEvents.js');

const count = require('../../../server/api/analytics/stats/count.js');

describe('Click Count Functions', () => {
  const data = generateEvents.generateTimesForMultipleTests()[0];
  const aClicks = data.data.aClicks;
  const bClicks = data.data.bClicks;
  const aVisits = data.data.aVisits;
  const bVisits = data.data.bVisits;

    it('Bucket counts should sum correctly', () => {
      const countResults = count.processDataIntoResults(aClicks, bClicks, aVisits, bVisits);

      const countClicksA = countResults.A.reduce((acc, curr) => acc + curr, 0);
      const countClicksB = countResults.B.reduce((acc, curr) => acc + curr, 0);

      const countVisitsA = countResults.visitsA.reduce((acc, curr) => acc + curr, 0);
      const countVisitsB = countResults.visitsB.reduce((acc, curr) => acc + curr, 0);

      expect(countClicksA).to.equal(aClicks.length);
      expect(countVisitsA).to.equal(aVisits.length);

      expect(countClicksB).to.equal(bClicks.length);
      expect(countVisitsB).to.equal(bVisits.length);
    });
});
