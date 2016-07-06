module.exports = {
  createClient: 'INSERT INTO clients (email, password) SELECT CAST($1 AS VARCHAR), ($2) WHERE NOT EXISTS (SELECT * FROM clients WHERE email = $1) RETURNING id, email',
  createPage: 'INSERT INTO pages (client_id, name) VALUES ((SELECT id FROM clients WHERE email = $1), $1) RETURNING id, name',
  getClient: 'SELECT * FROM clients WHERE email = $1',
  getClientID: 'SELECT id FROM clients WHERE email = $1',
  checkEmail: 'SELECT EXISTS (SELECT * FROM clients WHERE email = $1) as "exists"',
};
