'use strict';

const expect = require('chai').expect;
const pg = require('pg');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'test';

// dbQueries.js file to test
const authQry = require('../../../server/api/auth/db/dbQueries');
const analyticQry = require('../../../server/api/analytics/db/dbQueries');

//Note: tests further down in the file often depend on features tested earlier in the file

describe('DB Queries for API Server', () => {

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

  describe('Queries to add info to db for Analytics Service for API Server', () => {

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

    it('Should create a new page for a client', done => {
      const pageName = 'aTestPage';

      analyticQry.createPage(pageName, clientEmail, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].name).to.equal(pageName);
        // only checks existance
        expect(result.rows[0].id).to.exist;
        expect(result.rows[0].client_id).to.exist;
        done();
      });
    });

    it('Should create a test for a page and return unique test ID', done => {
      const testName = 'testname';
      const pageId = '1'; // changed to pageId: 1
      const clientEmail = 'userWithTests@asdf.com';  // TODO: perhaps refactor to use clientId instead

      analyticQry.createTest(testName, pageId, clientEmail, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].id).to.equal(1);
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
      const testNames = ['test1', 'test2'];
      const pageNames = ['page1', 'page2'];
      const clientEmail = 'userWithTests@asdf.com';
      const password = 'asdfqwerfdsaqwertrewsdfg';
      let testCount = 0;
      // populates userWithTests@asdf.com with 2 pages, 2 tests per page, total 4 tests
      authQry.createClient(clientEmail, password, () => {
        pageNames.forEach((pageName, pageIdZeroIndex) => {
          analyticQry.createPage(pageName, clientEmail, () => {
            testNames.forEach(test => {
              analyticQry.createTest(`${pageName}_${test}`, pageIdZeroIndex + 1, clientEmail, () => {
                testCount++;
                if (testCount >= 4) {
                  done();
                }
              });
            });
          });
        });
      });
    });

    it('Should get all tests, regardless of client email', done => {
      analyticQry.getAllResults((err, result) => {
        expect(result).to.exist;
        expect(result.rows.length).to.equal(4);
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

    it('Should get results given page id and client email', done => {
      const pageId = 2;
      const clientEmail = 'userWithTests@asdf.com';

      analyticQry.getPageTests(pageId, clientEmail, (err, result) => {
        expect(result).to.exist;
        expect(result.rows.length).to.equal(2);

        // .be.oneOf() is used because order of test insertion not guaranteed
        expect(result.rows[0].name).to.be.oneOf(['page2_test1', 'page2_test2']);
        expect(result.rows[1].name).to.be.oneOf(['page2_test1', 'page2_test2']);

        done();
      });
    });

    it('Should get all results for a client', done => {
      const clientEmail = 'userWithTests@asdf.com';

      analyticQry.getClientTests(clientEmail, (err, result) => {
        expect(result).to.exist;
        // 4 tests made before tests
        expect(result.rows.length).to.equal(4);
        done();
      });
    });

    it('Should get all pages for a client', done => {
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
