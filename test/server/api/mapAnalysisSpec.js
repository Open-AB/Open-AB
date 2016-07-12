const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

const mapAnalysis = require('../../../server/api/analytics/stats/mapAnalysis.js');

const mockIPData =  [
  {
    testName: 'Buy Now Button Test',
    testId: '3874E76',
    data: {
      aVisitsData: [{ IPAddress: '173.247.199.46', time: 1466896596001 }, { IPAddress: '173.247.199.46', time: 1466896596001 }],
      aClicksData: [{ IPAddress: '2.136.0.0', time: 1466896596001 }],
      bVisitsData: [{ IPAddress: '173.247.199.46', time: 1466896596001 }, { IPAddress: '173.247.199.46', time: 1466896596001 }],
      bClicksData: [{ IPAddress: '2.136.0.0', time: 1466896596001 }, { IPAddress: '173.247.199.46', time: 1466896596001 }],
    },
  },

  {
    testName: 'Buy Now Button Test',
    testId: '3874E76',
    data: {
      aVisitsData: [{ IPAddress: '173.247.199.46', time: 1466896596001 }, { IPAddress: '173.247.199.46', time: 1466896596001 }],
      aClicksData: [{ IPAddress: '23.16.0.0', time: 1466896596001 }],
      bVisitsData: [{ IPAddress: '173.247.199.46', time: 1466896596001 }, { IPAddress: '173.247.199.46', time: 1466896596001 }],
      bClicksData: [{ IPAddress: '23.16.0.0', time: 1466896596001 }, { IPAddress: '173.247.199.46', time: 1466896596001 }, { IPAddress: '173.247.199.46', time: 1466896596001 }],
    },
  },
];

  const getAllIpAddresses = mapAnalysis.getAllIpAddresses(mockIPData);
  const getAllCountryIds = mapAnalysis.getAllCountryIds(getAllIpAddresses);
  const objectCounter = mapAnalysis.objectCounter(getAllCountryIds);
  const scaledCount = mapAnalysis.scaledCount(objectCounter);
  const countAllCountriesByName = mapAnalysis.countAllCountriesByName(objectCounter, scaledCount);
  const countryCountToDisplay = mapAnalysis.countryCountToDisplay(mockIPData);

  describe('Should get all country ip addresses for a and b clicks', () => {
    it('Should return an array', () => {
      expect(Array.isArray(getAllIpAddresses)).to.equal(true);
    });
    it('Should return an array of length 7', () => {
      expect(getAllIpAddresses.length).to.equal(7);
    });
  });

  describe('Should return an array of all country information', () => {
    it('Should return an array of objects with correct keys', () => {
      expect(Array.isArray(getAllCountryIds)).to.equal(true);
      expect(getAllCountryIds[0]).to.have.all.keys('range', 'country', 'region', 'city', 'll', 'metro');
    });
  });

  describe('Should return object that counts countries', () => {
    it('Object keys should be present', () => {
      expect(objectCounter).to.have.all.keys('Canada', 'Spain', 'United States');
    });
  });

  describe('Should return scaled value equal to max country count times 0.5', () => {
    it('Should return scaled value equal to max country count times 0.5', () => {
      expect(scaledCount).to.equal(0.15000000000000002);
    });
  });

  describe('Should use scaledCount to return an array of countries', () => {
    it('Values should be present in array', () => {
      expect(countAllCountriesByName[0] || countAllCountriesByName[1] || countAllCountriesByName[2]).to.include('Spain', 2);
    });
  });

  describe('Should return array of tuples with country and count', () => {
    it('Should return an array', () => {
      expect(Array.isArray(getAllCountryIds)).to.equal(true);
      expect(countryCountToDisplay.length).to.equal(3);
    });
  });
