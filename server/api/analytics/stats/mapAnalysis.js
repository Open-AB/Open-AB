const _ = require('lodash');
const geoip = require('geoip-lite');
const countries = require('country-list')();

exports.getAllIpAddresses = (clickVisitsData) => {
  const clickIP = [];
  _.forEach(clickVisitsData, (clickVisitData) => {
    _.forEach(clickVisitData.data, (value, key) => {
      if (key === 'aClicksData' || key === 'bClicksData') {
        _.forEach(value, (item) => {
          clickIP.push(item.IPAddress);
        });
      }
    });
  });
  return clickIP;
};

exports.getAllCountryIds = (ipAddresses) => {
  const allCountryIds = [];
  _.forEach(ipAddresses, (ipAddress) => {
    allCountryIds.push(geoip.lookup(ipAddress));
  });
  return allCountryIds;
};

exports.countAllCountriesByName = (ipData) => {
  const countryCount = {};
  const countryCountArray = [];
  _.forEach(ipData, (ipObject) => {
    if (ipObject !== null) {
      const countryName = countries.getName(ipObject.country);
      countryCount[countryName] = countryCount[countryName] + 1 || 1;
    }
  });
  _.forEach(countryCount, (count, country) => {
    if (count > 100) {
      countryCountArray.push([country, count]);
    }
  });
  return countryCountArray;
};
