DROP DATABASE IF EXISTS openab;
DROP DATABASE IF EXISTS test;

CREATE DATABASE openab;
CREATE DATABASE test;

\c openab

CREATE TABLE clients (
 id SERIAL PRIMARY KEY,
 email VARCHAR(255) UNIQUE,
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
  name VARCHAR(255),
  result_a integer,
  result_b integer,
  uniqueid VARCHAR(255)
);

CREATE TABLE versions (
  id SERIAL PRIMARY KEY,
  test_id integer REFERENCES tests (id),
  ab VARCHAR(50),
  url VARCHAR(255),
  domlocation VARCHAR(255)
);

CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  version_id integer REFERENCES versions (id),
  ipaddress VARCHAR(50),
  time bigint
);

CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  version_id integer REFERENCES versions (id),
  ipaddress VARCHAR(50),
  time bigint
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

\c test

CREATE TABLE clients (
 id SERIAL PRIMARY KEY,
 email VARCHAR(255) UNIQUE,
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
  name VARCHAR(255),
  result_a integer,
  result_b integer,
  uniqueid VARCHAR(255)
);

CREATE TABLE versions (
  id SERIAL PRIMARY KEY,
  test_id integer REFERENCES tests (id),
  ab VARCHAR(50),
  url VARCHAR(255),
  domlocation VARCHAR(255)
);

CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  version_id integer REFERENCES versions (id),
  ipaddress VARCHAR(50),
  time bigint
);

CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  version_id integer REFERENCES versions (id),
  ipaddress VARCHAR(50),
  time bigint
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;