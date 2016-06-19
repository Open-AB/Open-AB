module.exports = {
  createClient: 'INSERT INTO clients (email, password) SELECT CAST($1 AS VARCHAR), ($2) WHERE NOT EXISTS (SELECT * FROM clients WHERE email = $1) RETURNING id',
  getClientPass: 'SELECT * FROM clients WHERE email = $1',  // changed this line
  getClientID: 'SELECT id FROM clients WHERE email = $1',
  checkEmail: 'SELECT EXISTS (SELECT * FROM clients WHERE email = $1)',
};
