
# Open-AB <img src="https://github.com/Open-AB/Open-AB/blob/develop/client/assets/images/logo.png" height=100> [![Build Status](https://travis-ci.org/Open-AB/Open-AB.svg?branch=develop)](https://travis-ci.org/Open-AB/Open-AB)

Start testing your website today at http://50.112.197.243/ !


![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/createTestScreenshot.png)
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/testScreenshot.png)
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/mapScreenshot.png)

#Tech
##Tech stack
- Frontend: [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [Google Charts](https://developers.google.com/chart/interactive/docs/gallery/intensitymap?csw=1), and [Chart.js](http://www.chartjs.org/)
- Backend: [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/), [Passport](http://passportjs.org/), and [Postgres](http://www.postgresql.org/)
- Testing: [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Karma](https://karma-runner.github.io/1.0/index.html), [SuperTest](https://github.com/visionmedia/supertest), and [Travis CI](https://travis-ci.org/)
- DevOps: [Amazon Web Services](https://aws.amazon.com/), [Webpack](https://webpack.github.io/), and [Babel](https://babeljs.io/)

##System architecture
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/architectureDiagram.png)
##Database schema
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/dbSchema.png)
##API
Endpoints listed [here](https://docs.google.com/document/d/1cEe9q_WKtF1gGvOY8mKO_YykiCYgUz5TyzkhNTzbVjw/edit#heading=h.3gm4p7cgyg85)

#Stats
We use a chi-square test to determine whether one version of the website leads to more conversions than the other:<ul>
<li>Each test must run for at least a week before we provide results to make sure that the test results are stable over time
<li>Our [calculations](https://docs.google.com/document/d/1Mr3FmaaBa3XHmD5YNFzMHgRZAZ0258tr77ghxRxVHcQ/edit) suggest that you will need about 2600 visitors to each version of your site before we can provide a helpful test result. Once you've had enough visitors, we let you know the results of your test.
</ul>

# Run OpenA/B in the dev environment
Run
```
  npm install
```

After setting up the database as described below, run
```
  npm run dev:api-server
```
```
  npm run dev:listening-server
```
## Database Setup
Install [PostgreSQL (9.5.3)](https://www.postgresql.org/download/)

Run
```
  psql
```
PostgreSQL must always be running while using OpenA/B

Find the filepath to the schema.sql file in Open-AB/server/db/schema.sql on your machine. In another terminal window, run the following command to create the openab and test databases:
```
  /Applications/Postgres.app/Contents/Versions/9.5/bin/psql < [file path to schema.sql file]/schema.sql
```

Seed the database with example data:

```
  npm run seed-db
```

#Team
- [David Doan](https://github.com/david-doan)
- [John Jenson](https://github.com/JRRJ)
- [Ben Rachbach](https://github.com/brachbach)
- [Jen Wong](https://github.com/jenjwong)
