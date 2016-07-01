module.exports = {
  createVisit: 'INSERT INTO visits (version_id, ipaddress, time) VALUES ((SELECT id FROM versions WHERE id = $1), $2, $3) RETURNING *',
  createClick: 'INSERT INTO clicks (version_id, ipaddress, time) VALUES ((SELECT id FROM versions WHERE id = $1), $2, $3) RETURNING *',
};
