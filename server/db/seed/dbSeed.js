const dbQry = require('./db/dbQueries');

const data = [
  {
    email: 'abcd@abcd.com',
    password: 'qwerasdfzxcv1234',
    pages: ['page1', 'page2', 'page3'],
    tests: [
      {
        name: 'test1p1',
        page: 'page1',
        result_a: 99,
        result_b: 55,
      },
      {
        name: 'test1p2',
        page: 'page2',
        result_a: 11,
        result_b: 22,
      },
      {
        name: 'test2p2',
        page: 'page2',
        result_a: 4444,
        result_b: 99999,
      },
      {
        name: 'test1p3',
        page: 'page3',
        result_a: 33,
        result_b: 44,
      },
    ],
  },
  {
    email: 'qwer@qwer.com',
    password: '4321rewqfdsa',
    pages: ['page1', 'page2', 'page3'],
    tests: [
      {
        name: 'test1p1',
        page: 'page1',
        result_a: 1234,
        result_b: 4321,
      },
      {
        name: 'test1p2',
        page: 'page2',
        result_a: 2345,
        result_b: 5432,
      },
      {
        name: 'test1p3',
        page: 'page3',
        result_a: 3456,
        result_b: 6543,
      },
      {
        name: 'test2p3',
        page: 'page3',
        result_a: 99,
        result_b: 0,
      },
    ],
  },
];

data.forEach(datum => {
  // add client
  dbQry.insertClient(datum.email, datum.password, () => {
    // add pages
    datum.pages.forEach(pageName => {
      dbQry.insertPage(pageName, datum.email, () => {
        // add test for page
        datum.tests.forEach(test => {
          if (test.page === pageName) {
            dbQry.addFilledTest(test.name, test.result_a, test.result_b, pageName, datum.email, () => {
              console.log('DONE WITH ', datum.email);
            });
          }
        });
      });
    });
  });
});
