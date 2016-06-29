module.exports = {
  getAllResults: 'SELECT * FROM tests',
  createTest: 'INSERT INTO tests (name, result_a, result_b, page_id) VALUES ($1, 0, 0, (SELECT id FROM pages WHERE id = $2 AND client_id = (SELECT id FROM clients WHERE email = $3))) RETURNING id',
  getResultForTestID: 'SELECT * FROM tests WHERE id = $1',
  createPage: 'INSERT INTO pages (name, client_id) VALUES ($1, (SELECT id FROM clients WHERE email = $2)) RETURNING id, name, client_id',
  getPageTests: 'SELECT * FROM tests WHERE page_id = (SELECT id FROM pages WHERE id = $1 AND client_id = (SELECT id FROM clients WHERE email = $2))',
  getClientTests: 'SELECT tests.* FROM tests INNER JOIN pages ON page_id = pages.id AND client_id = (SELECT id FROM clients WHERE email = $1)',
  getClientPages: 'SELECT * FROM pages WHERE client_id = (SELECT id FROM clients WHERE email = $1)',
};
