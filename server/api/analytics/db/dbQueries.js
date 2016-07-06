const db = require('./dbConnection').pg;
const dbpgp = require('./dbConnection').pgp;
const qry = require('./dbQryStrs');
const uuid = require('uuid');

// get all results in DB

const formatEventArrays = eventArrays => {
  return eventArrays.map(eventArray => {
    const mappedArray =  eventArray.map(event => {
      return {
        IPAddress: event.ipaddress,
        time: Number(event.time),
      };
    });
    return mappedArray.sort((eventA, eventB) => eventA.time - eventB.time);
  });
};

exports.getAllResults = (clientEmail, cb) => {
  dbpgp.query(qry.getClientTests, clientEmail)
    .then(tests => {
      const allResults = [];
      let counter = 0;

      return tests.forEach(test => {
        dbpgp.task(t1 => {
          return t1.batch([
            t1.query('select * from visits where version_id = (select id from versions where ab = $1 and test_id = $2)', ['a', test.id]),
            t1.query('select * from clicks where version_id = (select id from versions where ab = $1 and test_id = $2)', ['a', test.id]),
            t1.query('select * from visits where version_id = (select id from versions where ab = $1 and test_id = $2)', ['b', test.id]),
            t1.query('select * from clicks where version_id = (select id from versions where ab = $1 and test_id = $2)', ['b', test.id]),
          ]);
        })

        .then(testData => {
          const data = formatEventArrays(testData);

          allResults.push({
            testName: test.name,
            testId: test.id,
            data,
          });

          counter++;

          if (counter === tests.length) {
            const allResultsFormatted = allResults.map(result => {
              const dataArrays = result.data;
              result.data = {};
              result.data.aVisitsData = dataArrays[0];
              result.data.aClicksData = dataArrays[1];
              result.data.bVisitsData = dataArrays[2];
              result.data.bClicksData = dataArrays[3];
              return result;
            });

            cb(null, allResultsFormatted);
          }
        });
      });
    })
    .catch(err => {
      return cb(err, null);
    });
};

exports.createPage = (pageName, clientEmail, cb) => {
  db.query({
    text: qry.createPage,
    values: [pageName, clientEmail],
  }, cb);
};

exports.createTest = (testData, clientEmail, cb) => {
  const { testName, pageId, a, b } = testData;
  const uniqueId = uuid.v4();

  dbpgp.tx(t => {
    const addTest = t.query(qry.createTest, [testName, pageId, clientEmail, uniqueId]);
    const addVersionA = t.query(qry.insertVersion, ['a', a.url, a.DOMLocation, uniqueId]);
    const addVersionB = t.query(qry.insertVersion, ['b', b.url, b.DOMLocation, uniqueId]);
    return t.batch([addTest, addVersionA, addVersionB]);
  })
  .then(result => {
    cb(null, result);
  })
  .catch(err => {
    return cb(err, null);
  });
};

exports.getResultForTestID = (testID, cb) => {
  db.query({
    text: qry.getResultForTestID,
    values: [testID],
  }, cb);
};

exports.getPageTests = (pageName, clientEmail, cb) => {
  db.query({
    text: qry.getPageTests,
    values: [pageName, clientEmail],
  }, cb);
};

exports.getClientTests = (clientEmail, cb) => {
  db.query({
    text: qry.getClientTests,
    values: [clientEmail],
  }, cb);
};

exports.getClientPages = (clientEmail, cb) => {
  db.query({
    text: qry.getClientPages,
    values: [clientEmail],
  }, cb);
};

exports.getAllClientClicks = (clientEmail, cb) => {
  db.query({
    text: qry.getAllClientClicks,
    values: [clientEmail],
  }, cb);
};

exports.getAllClientVisits = (clientEmail, cb) => {
  db.query({
    text: qry.getAllClientVisits,
    values: [clientEmail],
  }, cb);
};

exports.getTestVersions = (pageId, cb) => {
  db.query({
    text: qry.getTestVersions,
    values: [pageId],
  }, cb);
};
