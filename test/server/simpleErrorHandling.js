'use strict';

const expect = require('chai').expect;
const pg = require('pg');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'errorTest';
process.env.PORT_API = 8888;
process.env.PORT_ELS = 9999;

// get servers
const api = require('../../server/api/index');
const els = require('../../server/listening/index');

// Supertest Servers
const API = require('supertest').agent(api);
const ELS = require('supertest').agent(els);

// dbQueries
const authQry = require('../../server/api/auth/db/dbQueries');
const analyticQry = require('../../server/api/analytics/db/dbQueries');
const eventQry = require('../../server/listening/events/db/dbQueries');

describe('Error Handling: DB Queries for API and listening Servers', () => {

  it('Auth QRYs: Should correctly report error of no connect to DB', done => {
    let count = 0;
    const endCount = Object.keys(authQry).length;

    const testFunc = (err) => {
      expect(err).to.exists;
      expect(err.message).to.equal('Database connection refused');
      count++;

      if (count >= endCount) {
        done();
      }
    };

    const testFuncs = [];
    for (var i = 0; i < 10; i++) {
      testFuncs.push(testFunc);
    }

    Object.keys(authQry).forEach(key => {
      const context = this;
      authQry[key].apply(context, testFuncs);
    });
  });

  it('Analytic QRYs: Should correctly report error of no connect to DB', done => {  // how do we know the db isn't running?
    let count = 0;
    const endCount = Object.keys(analyticQry).length;

    const testFunc = (err) => {
      expect(err).to.exists;
      // expect(err.message).to.equal('Database connection refused');
      count++;

      if (count >= endCount) {
        done();
      }
    };

    const testFuncs = [];
    for (var i = 0; i < 10; i++) {
      testFuncs.push(testFunc);
    }

    Object.keys(analyticQry).forEach(key => {
      const context = this;
      analyticQry[key].apply(context, testFuncs);
    });
  });

  it('Event QRYs: Should correctly report error of no connect to DB', done => {
    let count = 0;
    const endCount = Object.keys(eventQry).length;

    const testFunc = (err) => {
      expect(err).to.exists;
      expect(err.message).to.equal('Database connection refused');
      count++;

      if (count >= endCount) {
        done();
      }
    };

    const testFuncs = [];
    for (var i = 0; i < 10; i++) {
      testFuncs.push(testFunc);
    }

    Object.keys(eventQry).forEach(key => {
      const context = this;
      eventQry[key].apply(context, testFuncs);
    });
  });
});

describe('Servers to Client: Error Handling', () => {
  describe('When DB is disconnected', () => {

    describe('EVENTS endpoints: always respond with 204', () => {
      it('Click Listening: Always respond with 204', done => {
        ELS
          .post('/listening/clicks')
          .expect(204)
          .end((err, res) => {
            for (let i = 0; i < 1000; i++) {
              ELS
              .post('/listening/clicks')
              .expect(204);
            }
            done();
          });
      });
    });

    describe('AUTH endpoints: respond with 500', () => {
      it('Signup Endpoints: get 500 when DB is disconnected', done => {
        const body = { email: 'asdf', password: 'asdf' };
        API
          .post('/api/signup')
          .send(body)
          .expect(500)
          .end((err, res) => {
            // console.log(err, '<<<< ERR');
            // console.log(res.text, '>>>>> res');
            done();
          });
      }).timeout(10000);

      it('Signin Endpoints: get 500 when DB is disconnected', done => {
        const body = { email: 'asdf', password: 'asdf' };
        API
          .post('/api/signin')
          .send(body)
          .expect(500)
          .end((err, res) => {
            // console.log(err, '<<<< ERR');
            // console.log(res.text, '>>>>> res');
            done();
          });
      });
    });

    describe('ANALYTIC endpoints: respond with 500', () => {

      it('Dash Data Endpoint: 500 when DB is disconnected', done => {
        API
          .get('/api/dashData')
          .expect(500)
          .end((err, res) => {
            done();
          });
      });

      xit('Create Test Endpoint: 500 when DB is disconnected', done => {
        const body = {
          testName: 'asdf',
          pageName: 'asdf',
          clientEmail: 'asdf',
        };

        API
          .post('/api/createTest')
          .send(body)
          .expect(500, done);
      });


      xit('Get Chart Data Test Endpoint: 500 when DB is disconnected', done => {
        API
          .get('/api/chartData')
          .expect(500, done);
      });
    });
  });
});
