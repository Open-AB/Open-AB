exports.countOccurences = (arr) => arr.reduce(
  (acc, curr) => {
    acc[curr] = acc[curr] ? ++acc[curr] : 1;
    return acc;
  }, {});

exports.createBuckets = (bucketWidth, totalArr) => {
  const start = totalArr[0];
  const end = totalArr[totalArr.length - 1];

  const upperLimitOfBuckets = [];
  let ind = bucketWidth;

  while (ind + start <= end) {
    upperLimitOfBuckets.push(start + ind);
    ind += bucketWidth;
  }
  upperLimitOfBuckets.push(start + ind);

  return upperLimitOfBuckets;
};

exports.countIntoBuckets = (upperLimitOfBuckets, arr) => {
  let bucketInd = 0;
  return arr.reduce((bucketCounts, curr) => {
    if (curr < upperLimitOfBuckets[bucketInd]) {
      bucketCounts[bucketInd] = bucketCounts[bucketInd] === undefined ? 1 : ++bucketCounts[bucketInd];
    } else {
      bucketInd++;
      bucketCounts[bucketInd] = bucketCounts[bucketInd] === undefined ? 1 : ++bucketCounts[bucketInd];
    }
    return bucketCounts;
  }, []);
};

exports.processSingleTestDataIntoResults = processSingleTestDataIntoResults = (aClicks, bClicks, aVisits, bVisits) => {
  const TotalVisits = aVisits.concat(bVisits).sort((a, b) => a - b);

  const bucketWidth = determineBucketWidth(TotalVisits);

  const buckets = exports.createBuckets(bucketWidth * 24 * 60 * 60 * 1000, TotalVisits);

  const aBucketCount = exports.countIntoBuckets(buckets, aClicks);
  const bBucketCount = exports.countIntoBuckets(buckets, bClicks);

  const aBucketVisitCount = exports.countIntoBuckets(buckets, aVisits);
  const bBucketVisitCount = exports.countIntoBuckets(buckets, bVisits);

  const totalBucketCount = exports.countIntoBuckets(buckets, TotalVisits);

  return {
    aClicks: aBucketCount,
    bClicks: bBucketCount,
    Total: totalBucketCount,
    buckets,
    aVisits: aBucketVisitCount,
    bVisits: bBucketVisitCount,
  };
};

exports.processAllTestsDataIntoResults = testsData => {
  return testsData.map(testData => {
    return {
      testName: testData.testName,
      testId: testData.testId,
      data: exports.processSingleTestDataIntoResults(
                    testData.data.aClicks,
                    testData.data.bClicks,
                    testData.data.aVisits,
                    testData.data.bVisits
                  ),
    };
  });
};

function determineBucketWidth(visitData) { // visitData is assumed to be sorted oldest -> newest
  const earliest = visitData[0];
  const latest = visitData[visitData.length - 1];
  const maxDiff = latest - earliest; // in milliseconds

  const days = maxDiff / 1000 / 60 / 60 / 24;
  if (days > 1) {
    return 1; // bucketWidth is 1 day
  }

  const hours = maxDiff / 1000 / 60 / 60;
  if (hours > 1) {
    return 1 / 24; // bucketWidth is 1 hour
  }

  const mins = maxDiff / 1000 / 60;
  if (mins > 1) {
    return 1 / 24 / 60; // bucketWidth is 1 min
  }

  const sec = maxDiff / 1000;
  if (sec > 1) {
    return 1 / 24 / 60 / 60; // bucketWidth is 1 sec
  }

  return 1; // default bucketWidth is 1 day bu
}
