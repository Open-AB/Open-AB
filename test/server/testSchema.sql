DROP TABLE IF EXISTS clients, pages, tests, versions, visits, clicks;

CREATE TABLE clients (
 id SERIAL PRIMARY KEY,
 email VARCHAR(50) UNIQUE,
 password VARCHAR(255)
);

CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  client_id integer REFERENCES clients (id),
  name VARCHAR(50)
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  page_id integer REFERENCES pages (id),
  name VARCHAR(50),
  result_a integer,
  result_b integer,
  uniqueid VARCHAR(250)
);

CREATE TABLE versions (
  id SERIAL PRIMARY KEY,
  test_id integer REFERENCES tests (id),
  ab VARCHAR(50),
  url VARCHAR(250),
  domlocation VARCHAR(50)
);

CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  version_id integer REFERENCES versions (id),
  ipaddress VARCHAR(50),
  time VARCHAR(50)
);

CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  version_id integer REFERENCES versions (id),
  ipaddress VARCHAR(50),
  time VARCHAR(50)
);
