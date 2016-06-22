'use strict';

const expect = require('chai').expect;
const pg = require('pg');
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'test';

// dbQueries.js file to test
const authQry = require('../../../server/api/auth/db/dbQueries');
const analyticQry = require('../../../server/api/analytics/db/dbQueries');

describe('DB Queries for API Server', () => {
  
  before( done => {
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

  describe('Client Queries from Auth Service for API Server', () => {

    before( done => {
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

    it('Should fail to create new client if email exists', done => {
      const email = 'newUser@CoolPeople.com';
      const password = 'zzzzzzz';

      authQry.createClient(email, password, (err, result) => {
        expect(result).to.exist;
        expect(result.rows.length).to.equal(0);
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

    it('Should return stored db password if sign in with exisiting client', done => {
      const email = 'newUser@CoolPeople.com';
      const password = 'zzzzzzzz';

      authQry.signIn(email, password, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].password).to.equal('abcd1234FDSA');
        expect(result.rows[0].password).to.not.equal(password);
        done();
      });
    });
  });

  describe('Test Queries from Analytics Service for API Server', () => {

    before( (done) => {
      const testNames = ['test1', 'test2'];
      const pageNames = ['page1', 'page2'];
      const clientEmail = 'userWithTests@asdf.com';
      let testCount = 0;
      // populates userWithTests@asdf.com with 2 pages, 2 tests per page, total 4 tests
      pageNames.forEach( page => {
        testNames.forEach( test => {
          analyticQry.createTest(test, page, clientEmail, () => {
            testCount++;
            if (testCount >= 4) {
              done();
            }
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

    xit('Should create a new page for a client', done => {
      const pageName = 'aTestPage';
      const clientEmail = 'userWithTests@asdf.com';

      done();
    });

    it('Should create a test for a page and return unique test ID', done => {
      const testName = 'testname';
      const pageName = 'page1';
      const clientEmail = 'userWithTests@asdf.com';

      analyticQry.createTest(testName, pageName, clientEmail, (err, result) => {
        expect(result).to.exist;
        expect(result.rows[0].id).to.equal(5);
        done();
      });
    });

    xit('Should get results given unique test ID', done => {
      done();
    });

    xit('Should get results given page name and client email', done => {
      done();
    });

    xit('Should get all results for given page and client email', done => {
      done();
    });

    xit('Should get all results for a client', done => {
      done();
    });

    xit('Should get all pages for a client', done => {
      done();
    });

  });

});

