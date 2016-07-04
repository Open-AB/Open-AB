const env = require('../../../.env');

module.exports = (() => {
  if (process.env.SERVER === 'deployed') {
    return {
      user: 'openab',
      database: 'openab',
      password: env.password,
      host: env.host,
      port: 5432,
    };
  }
  if (process.env.NODE_ENV === 'test') {
    return 'postgres://localhost:5432/test';
  }
  if (process.env.NODE_ENV === 'errorTest') {
    return 'postgres://localhost:5432/errorTest';
  }
  return 'postgres://localhost:5432/openab';
})();
