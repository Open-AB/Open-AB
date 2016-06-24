module.exports = {
  insertClient: 'INSERT INTO clients (email, password) VALUES ($1, $2)',
  insertPage: 'INSERT INTO pages (name, client_id) VALUES ($1, (SELECT id FROM clients WHERE email = $2))',
  addFilledTest: 'INSERT INTO tests (name, result_a, result_b, page_id) VALUES ($1, $2, $3, (SELECT id FROM pages WHERE name = $4 AND client_id = (SELECT id FROM clients WHERE email = $5)))',
};
