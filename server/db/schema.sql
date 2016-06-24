DROP DATABASE IF EXISTS openab;

CREATE DATABASE openab;
CREATE DATABASE test;

\c openab

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
  result_b integer
);