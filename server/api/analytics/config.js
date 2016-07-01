module.exports = {
  db: {
    host: 'localhost',
    port: 5432,
    dbName: process.env.NODE_ENV || 'openab',
  },
};
