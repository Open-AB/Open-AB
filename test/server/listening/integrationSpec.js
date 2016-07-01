const expect = require('chai').expect;
const pg = require('pg');
const fs = require('fs');
const path = require('path');

// listening server config
process.env.PORT = 9999;
process.env.NODE_ENV = 'test';
const request = require('supertest')(`http://localhost:${process.env.PORT}`); // can and probably should factor out app.js and use that instead

// dbQueries to populate test DB
const authQry = require('../../../server/api/auth/db/dbQueries');
const analyticQry = require('../../../server/api/analytics/db/dbQueries');

describe('Listening Server: End point Testing', () => {
  // before(done => {
  //   // connect to test database
  //   const connectionString = 'postgres://localhost:5432/test';
  //   const testSQL = fs.readFileSync(path.resolve(__dirname, '../testSchema.sql')).toString();
  //   // drop tables in test database, create new tables in database
  //   const client = new pg.Client(connectionString);
  //   client.connect();
  //   const query = client.query(testSQL);
  //   query.on('end', () => {
  //     client.end();
  //     done();
  //   });
  // });

  // describe('Event listening:', () => {
  //   // populate database with a client, page, and test
  //   before(done => {
  //     const clientEmail = 'testUser@test.com';
  //     const password = 'password';
  //     const pageName = 'page1';
  //     const testName = 'noticeablyLongTestName';

  //     authQry.createClient(clientEmail, password, () => {
  //       analyticQry.createPage(pageName, clientEmail, () => {
  //         analyticQry.createTest(testName, pageName, clientEmail, () => {
  //           done();
  //         });
  //       });
  //     });
  //   });

  //   it('hear click', done => {
  //     const body = { testId: 1 };
  //     request
  //       .post('/listening/clicks')
  //       .send(body)
  //       .expect(204)
  //       .end((err, res) => {
  //         if (err) { done(err); }
  //         // setTimeout is used because /listening/click always immediately returns 204
  //         // need some time for dbQuery to increment test finish before getting result
  //         setTimeout(() => {
  //           analyticQry.getResultForTestID(1, (err, result) => {
  //             expect(result).to.exist;
  //             expect(result.rows[0].name).to.equal('noticeablyLongTestName');
  //             expect(result.rows[0]).to.have.all.keys('name', 'id', 'page_id', 'result_a', 'result_b');
  //             expect(result.rows[0].result_a).to.equal(1);
  //             done();
  //           });
  //         }, 50);
  //       });
  //   });
  // });
});
