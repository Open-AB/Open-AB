'use strict';

const expect = require('chai').expect;
const pg = require('pg');
const fs = require('fs');
const path = require('path');

// test environment was set in the npm script to run this file, so process.env.NODE_ENV === 'test';

// dbQueries.js file to test
const authQry = require('../../../server/api/auth/db/dbQueries');
const analyticQry = require('../../../server/api/analytics/db/dbQueries');
const eventQry = require('../../../server/listening/events/db/dbQueries');

// Note: tests further down in the file often depend on features tested earlier in the file

describe('DB Queries for API Server', () => {

  const testData = [
    {
      testName: 'test1',
      pageId: 1,
      a: {
        url: 'http://mysite.com/a',
        DOMLocation: '0-1-3-0-1-0',
      },
      b: {
        url: 'http://mysite.com/b',
        DOMLocation: '0-1-3-3-6-5',
      },
    },
    {
      testName: 'test2',
      pageId: 1,
      a: {
        url: 'http://yoursite.com/a',
        DOMLocation: '24-7-365',
      },
      b: {
        url: 'http://yoursite.com/b',
        DOMLocation: '1-2-3-4-5',
      },
    },
    {
      testName: 'test3',
      pageId: 2,
      a: {
        url: 'http://theirsite.com/a',
        DOMLocation: '1-1-1-1-1-1',
      },
      b: {
        url: 'http://theirsite.com/b',
        DOMLocation: '2-2-2-2-2-2',
      },
    },
    {
      testName: 'test4',
      pageId: 2,
      a: {
        url: 'http://oursite.com/a',
        DOMLocation: '3-3-3-3-3',
      },
      b: {
        url: 'http://oursite.com/b',
        DOMLocation: '4-4-4-4-4',
      },
    },
  ];

  const visitsData = [
    {
      versionId: 1,
      IPAddress: '127.0.0.1',
      time: 1467249322489,
    },
    {
      versionId: 1,
      IPAddress: '127.0.0.2',
      time: 2467249322489,
    },
    {
      versionId: 3,
      IPAddress: '2.2.2.2',
      time: 3467249322489,
    },
    {
      versionId: 3,
      IPAddress: '2.2.2.2',
      time: 4467249322489,
    },
  ];

  const clicksData = [
    {
      versionId: 1,
      IPAddress: '127.0.0.3',
      time: 3467249322489,
    },
    {
      versionId: 1,
      IPAddress: '127.0.0.4',
      time: 4467249322489,
    },
  ];

  describe('Client Queries from Auth Service for API Server', () => {

    before(done => {
      // connect to test database
      const connectionString = 'postgres://localhost:5432/test';
      const testSQL = fs.readFileSync(path.resolve(__dirname, '../testSchema.sql')).toString();
      // drop tables in test database, create new tables in database
      const client = new pg.Client(connectionString);
      client.connect();
      const query = client.query(testSQL);
      query.on('end', () => {
        client.end();
        done();
      });
    });

    before(done => {
      const seedEmail = 'seedEmail@email.com';
      const seedPassword = 'asdfQWERTY4321';
      authQry.createClient(seedEmail, seedPassword, () => {
        done();
      });
    });

    it('Should check if client email does NOT exist', done => {
      const email = 'zzzzzzzzzzzzzz@zzzzzzz.zzzzzzz';

      authQry.checkEmail(email, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].exists).to.equal(false);
        done();
      });
    });

    it('Should create a new client if client email does NOT exist', done => {
      const email = 'newUser@CoolPeople.com';
      const password = 'abcd1234FDSA';

      authQry.createClient(email, password, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].id).to.exist;
        expect(result.rows[0].id).to.equal(2);
        done();
      });
    });

    it('Should check if client email exists', done => {
      const email = 'newUser@CoolPeople.com';

      authQry.checkEmail(email, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].exists).to.equal(true);
        done();
      });
    });

    it('Should return false if email exists when creating new client', done => {
      const email = 'newUser@CoolPeople.com';
      const password = 'zzzzzzz';

      authQry.createClient(email, password, (err, result) => {
        expect(result).to.exist;
        expect(result).to.equal(false);
        done();
      });
    });

    it('Should return false if sign in with nonexistant client email', done => {
      const email = 'unknown@unknown.com';
      const password = 'zzzzzzzz';

      authQry.signIn(email, password, (err, result) => {
        expect(result).to.exist;
        expect(result).to.equal(false);
        done();
      });
    });

    it('Should return client email and stored db password if sign in with exisiting client', done => {
      const email = 'newUser@CoolPeople.com';
      const password = 'zzzzzzzz';

      authQry.signIn(email, password, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].email).to.equal(email);
        expect(result.rows[0].password).to.exist;
        expect(result.rows[0].password).to.not.equal(password);
        done();
      });
    });
  });

  describe('Queries to add data to db for Analytics Service for API Server', () => {

    const testNames = ['test1', 'test2'];
    // const pageNames = ['page1', 'page2'];
    const clientEmail = 'userWithTests@asdf.com';
    const password = 'asdfqwerfdsaqwertrewsdfg';
    let testCount = 0;
  
    before(done => {
      authQry.createClient(clientEmail, password, () => {
        done();
      });
    });

    it('Should create a new page for client', done => {

      const pageName = 'page1';

      analyticQry.createPage(pageName, clientEmail, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].name).to.equal(pageName);
        // only checks existance
        expect(result.rows[0].id).to.exist;
        expect(result.rows[0].client_id).to.exist;
        done();
      });
    });

    describe('Create tests', () => {

      const testData1 = testData[0];
      const testData2 = testData[1];

      let test1Result, test2Result;

      before(done => {
        analyticQry.createTest(testData1, clientEmail, (err, result) => {
          if (err) {
            console.err(err);
          } else {
            test1Result = result;
            analyticQry.createTest(testData2, clientEmail, (err, result) => {
              if (err) {
                console.err(err);
              } else {
                test2Result = result;
                done();
              }
            });
          }
        });
      });

      it('Should create a test for a page with two versions and return unique test ID', done => {
        expect(test1Result[1][0].test_id).to.equal(1);
        expect(test2Result[0][0].page_id).to.equal(1);
        expect(test2Result[1][0].test_id).to.equal(2);
        expect(test2Result[2][0].url).to.equal('http://yoursite.com/b');
        expect(test2Result[2][0].domlocation).to.equal('1-2-3-4-5');
        done();
      });
    });
  });

  describe('Queries to get info from DB for Analytics Service for API Server', () => {
    before(done => {
      // connect to test database
      const connectionString = 'postgres://localhost:5432/test';
      const testSQL = fs.readFileSync(path.resolve(__dirname, '../testSchema.sql')).toString();
      // drop tables in test database, create new tables in database
      const client = new pg.Client(connectionString);
      client.connect();
      const query = client.query(testSQL);
      query.on('end', () => {
        client.end();
        done();
      });
    });

    before(done => {
      const pageNames = ['page1', 'page2'];
      const clientEmail = 'userWithTests@asdf.com';
      const password = 'asdfqwerfdsaqwertrewsdfg';
      let testCount = 0;
      // populates userWithTests@asdf.com with 2 pages, 2 tests per page, total 4 tests
      authQry.createClient(clientEmail, password, () => {
        // pageNames.forEach((pageName, pageIdZeroIndex) => {
          // const pageId = pageIdZeroIndex + 1;
          // analyticQry.createPage(pageName, clientEmail, () => {
            testData.forEach(test => {
              //if (test.pageId === pageId) {
                analyticQry.createTest(test, clientEmail, () => {
                  testCount++;
                  if (testCount >= 4) {
                    done();
                  }
                });
              //}
            });
          // });
        // });
      });
    });

    before(done => {
      eventQry.hearVisit(visitsData[0], (err, result) => {
        eventQry.hearVisit(visitsData[1], (err, result) => {
          eventQry.hearClick(clicksData[0], (err, result) => {
            eventQry.hearClick(clicksData[1], (err, result) => {
              eventQry.hearVisit(visitsData[2], (err, result) => {
                eventQry.hearVisit(visitsData[3], (err, result) => {
                  done();
                });
              });
            });
          });
        });
      });
    });

    xit('Should get all tests, regardless of client email', done => {  //TODO: add more tests here
      analyticQry.getAllResults((err, result) => {
        const bVisits = result[0].data.bVisitsData;

        expect(result).to.exist;
        expect(result.length).to.equal(4);
        expect(result[0].testName).to.be.oneOf(['test1', 'test2', 'test3', 'test4']);

        for (let i = 0; i < bVisits.length - 1; i++) {
          expect(bVisits[i + 1].time).to.be.above(bVisits[i].time); // only comes into play when testing against more realistic data
        }
        // expect(result[1].data.aVisitData[0].ipAddress).to.equal('127.0.0.1');
        done();
      });
    });


    it('Should get results given unique test ID', done => {
      const testID = 4;

      analyticQry.getResultForTestID(testID, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].id).to.equal(testID);
        expect(result.rows[0].result_a).to.equal(0);
        done();
      });
    });

    xit('Should get results given page id and client email', done => {
      const pageId = 2;
      const clientEmail = 'userWithTests@asdf.com';

      analyticQry.getPageTests(pageId, clientEmail, (err, result) => {
        expect(result).to.exist;
        expect(result.rows.length).to.equal(2);

        // .be.oneOf() is used because order of test insertion not guaranteed
        expect(result.rows[0].name).to.be.oneOf(['test3', 'test4']);
        expect(result.rows[1].name).to.be.oneOf(['test3', 'test4']);

        done();
      });
    });

    xit('Should get all results for a client', done => {
      const clientEmail = 'userWithTests@asdf.com';

      analyticQry.getClientTests(clientEmail, (err, result) => {
        console.log(result);
        expect(result).to.exist;
        // 4 tests made before tests
        expect(result.rows.length).to.equal(4);
        done();
      });
    });

    xit('Should get all pages for a client', done => {
      const clientEmail = 'userWithTests@asdf.com';
      const pageNames = ['page1', 'page2', 'aTestPage'];

      analyticQry.getClientPages(clientEmail, (err, result) => {
        expect(result).to.exist;
        // 2 pages made before tests
        expect(result.rows.length).to.equal(2);
        expect(result.rows[0].name).to.be.oneOf(pageNames);
        expect(result.rows[1].name).to.be.oneOf(pageNames);
        done();
      });
    });
  });
});
