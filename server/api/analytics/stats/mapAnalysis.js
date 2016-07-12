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

exports.objectCounter = (ipData) => {
  const countryCount = {};
  _.forEach(ipData, (ipObject) => {
    if (ipObject !== null) {
      const countryName = countries.getName(ipObject.country);
      countryCount[countryName] = countryCount[countryName] + 1 || 1;
    }
  });
  return countryCount;
};

exports.scaledCount = (countObject) => {
  let scaledMax = 0;
  _.forEach(countObject, (count) => {
    if (count > scaledMax) {
      scaledMax = count;
    }
  });
  return scaledMax * 0.05;
};

exports.countAllCountriesByName = (objectCount, scaledMax) => {
  const countryCountArray = [];
  _.forEach(objectCount, (count, country) => {
    if (count > scaledMax) {
      countryCountArray.push([country, count]);
    }
  });
  return countryCountArray;
};

exports.countryCountToDisplay = (result) => {
  const IpAddresses = exports.getAllIpAddresses(result);
  const countryIds = exports.getAllCountryIds(IpAddresses);
  const objectCount = exports.objectCounter(countryIds);
  const scaled = exports.scaledCount(objectCount);
  return exports.countAllCountriesByName(objectCount, scaled);
};
