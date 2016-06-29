const _ = require('lodash');
const geoip = require('geoip-lite');
const countries = require('country-list')();

const ipMockDatabaseData =
  [
    {
      testName: 'buyNowButtonTest',
      testId: '3874E76',
      data: {
        aVisitsData: [{ IPAddress: '31.216.31.255', time: 1466896596001 }, { IPAddress: '673.247.199.46', time: 1466896596001 }],
        aClicksData: [{ IPAddress: '31.216.31.255', time: 2366896596001 }, { IPAddress: '873.247.199.46', time: 1466896596001 }],
        bVisitsData: [{ IPAddress: '173.247.199.46', time: 7766896596001 }, { IPAddress: '973.247.199.46', time: 1466896596001 }],
        bClicksData: [{ IPAddress: '173.247.199.46', time: 4466896596001 }, { IPAddress: '273.247.199.46', time: 1466896596001 }],
      },
    },
    {
      testName: 'otherTest',
      testId: '3874E75',
      data: {
        aVisitsData: [{ IPAddress: '173.247.199.46', time: 1466896596001 }, { IPAddress: '673.247.199.46', time: 1466896596001 }],
        aClicksData: [{ IPAddress: '1.2.31.255', time: 2366896596001 }, { IPAddress: '873.247.199.46', time: 1466896596001 }],
        bVisitsData: [{ IPAddress: '173.247.199.46', time: 7766896596001 }, { IPAddress: '973.247.199.46', time: 1466896596001 }],
        bClicksData: [{ IPAddress: '1.2.31.255', time: 4466896596001 }, { IPAddress: '273.247.199.46', time: 1466896596001 }],
      },
    },
  ];


const getClickDataArray = (databaseData) => {
  const clickIP = [];
  _.forEach(databaseData, (objArray) => {
    _.forEach(objArray.data, (value, key) => {
      if (key === 'aClicksData' || key === 'bClicksData') {
        _.forEach(value, (item) => {
          clickIP.push(item.IPAddress);
        });
      }
    });
  });
  return clickIP;
};

const getAllIpData = (ipArray) => {
  const allIpData = [];
  _.forEach(ipArray, (ipAddress) => {
    allIpData.push(geoip.lookup(ipAddress));
  });
  return allIpData;
};

const list = getClickDataArray(ipMockDatabaseData);
const allIpData = getAllIpData(list);

const countCountries = (ipData) => {
  const countryCount = {};
  const countryCountArray = [];
  _.forEach(ipData, (ipObject) => {
    if (ipObject !== null) {
      const countryName = countries.getName(ipObject.country);
      countryCount[countryName] = countryCount[countryName] + 1 || 1;
    }
  });

  _.forEach(countryCount, (count, country) => {
    countryCountArray.push([country, count]);
  });
  return countryCountArray;
};
