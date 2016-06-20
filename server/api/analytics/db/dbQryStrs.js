module.exports = {
  getAllResults: 'SELECT * FROM tests',
  createTest: 'INSERT INTO tests (name, result_a, result_b, page_id) VALUES ($1, 0, 0, (SELECT id FROM pages WHERE name = $2 AND client_id = (SELECT id FROM clients WHERE email = $3))) RETURNING id',
};
