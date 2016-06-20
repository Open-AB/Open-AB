module.exports = {
  incrementTest: 'UPDATE tests SET result_a = result_a + 1 WHERE name = $1 AND page_id = (SELECT id FROM pages WHERE name = $2 AND client_id = (SELECT id FROM clients WHERE email = $3))',
};
