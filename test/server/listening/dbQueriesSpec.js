'use strict';

const expect = require('chai').expect;
const pg = require('pg');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'test';

// dbQueries.js file to test
const eventQry = require('../../../server/listening/events/db/dbQueries');
// dbQueries to seed test DB
const authQry = require('../../../server/api/auth/db/dbQueries');
const analyticQry = require('../../../server/api/analytics/db/dbQueries');

describe('DB Queries for Listening Server', () => {

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

  describe('Event Queries from Events Service for Listening Server', () => {

    before( done => {
      // seed db with client
      const seedEmail = 'seedEmail@email.com';
      const seedPassword = 'asdfQWERTY4321';
      const seedPageName = 'testPage';
      const seedTestName = 'eventTest';
      authQry.createClient(seedEmail, seedPassword, () => {
        analyticQry.createPage(seedPageName, seedEmail, () => {
          analyticQry.createTest(seedTestName, seedPageName, seedEmail, () => {
            done();
          });
        });
      });
    });

    it('Should increment JUST result_a for given testId', done => {
      const testId = 1;
      // increment result_a of testId
      eventQry.hearClick(testId, () => {
        // check if result_a of testId did increment
        analyticQry.getResultForTestID(testId, (error, result) => {
          expect(result.rows[0].result_a).to.exist;
          expect(result.rows[0].result_a).to.equal(1);
          done();
        });
      });
    });

    xit('Should increment JUST result_b for given testId');
  });
});

