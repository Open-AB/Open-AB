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

  describe('Event Queries from Events Service for Listening Server', () => {
    before(done => {
      // seed db with client
      const seedEmail = 'seedEmail@email.com';
      const seedPassword = 'asdfQWERTY4321';
      const seedPageName = 'testPage';
      const seedTest = {
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
      };

      authQry.createClient(seedEmail, seedPassword, () => {
        analyticQry.createPage(seedPageName, seedEmail, () => {
          analyticQry.createTest(seedTest, seedEmail, () => {
            done();
          });
        });
      });
    });

    it('should create a visit', (done) => {
      const visitData = {
        versionId: 1,  // look this up, don't just use it.
        IPAddress: '127.0.0.1',
        time: 1467249322489,
      };

      eventQry.hearVisit(visitData, (err, result) => {
        if (err) {
          console.error(err);
          done();
        } else {
          expect(result.rows[0].version_id).to.equal(1);
          expect(result.rows[0].ipaddress).to.equal('127.0.0.1');
          expect(result.rows[0].time).to.equal('1467249322489');
          done();
        }
      });

    });

    it('should create a click', (done) => {
      const clickData = {
        versionId: 1,  // look this up, don't just use it.
        IPAddress: '127.0.0.1',
        time: 1467249322489,
      };

      eventQry.hearClick(clickData, (err, result) => {
        if (err) {
          console.error(err);
          done();
        } else {
          expect(result.rows[0].version_id).to.equal(1);
          expect(result.rows[0].ipaddress).to.equal('127.0.0.1');
          expect(result.rows[0].time).to.equal('1467249322489');
          done();
        }
      });

    });

  });
});

