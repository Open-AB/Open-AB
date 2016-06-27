const expect = require('chai').expect;
const pg = require('pg');
const fs = require('fs');
const path = require('path');

// api server config
process.env.PORT = 8888;
process.env.NODE_ENV = 'test';
const request = require('supertest')(`http://localhost:${process.env.PORT}`); // TODO: factor out app.js and use that instead

// dbQueries to populate test DB
const authQry = require('../../../server/api/auth/db/dbQueries');
// const analyticQry = require('../../../server/api/analytics/db/dbQueries');

describe('API Server: End point Testing', () => {
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

  describe('Signup:', () => {
    it('signs up user and redirects them to the dashboard', done => {
      const body = { email: 'test@gmail.com', password: 'abc123' };
      request
        .post('/api/signup')
        .send(body)
        .expect('Location', '/dashboard', done);
    });

    it('saves user info to the database on signup', done => {
      authQry.checkEmail('test@gmail.com', (err, result) => {
        if (err) {
          console.error(err);
        }
        expect(result.rows.length).to.equal(1);
        done();
      });
    });

    it('rejects signup if email already in database', done => {
      const body = { email: 'test@gmail.com', password: 'abc123' };
      request
        .post('/api/signup')
        .send(body)
        .expect(400, done);
    });
    // TODO: add email validation/password validation and test it
  });

  describe('Signin:', () => {
    before(done => {
      authQry.createClient('test2@gmail.com', 'abcd123', (error) => {
        if (error) {
          console.error(error);
        }
        done();
      });
    });

    it('signs in user with valid username and password and redirects them to dashboard', done => {
      const body = { email: 'test2@gmail.com', password: 'abcd123' };
      request
        .post('/api/signin')
        .send(body)
        .expect('Location', '/dashboard', done);
    });

    it('rejects user with invalid username', done => {
      const body = { email: 'wrong@gmail.com', password: 'abcd123' };
      request
        .post('/api/signin')
        .send(body)
        .expect(401, done);
    });

    it('rejects user with invalid password', done => {
      const body = { email: 'test2@gmail.com', password: 'wrong' };
      request
        .post('/api/signin')
        .send(body)
        .expect(401, done);
    });
  });
});

