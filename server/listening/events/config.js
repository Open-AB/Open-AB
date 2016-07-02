module.exports = (() => {
  if (process.env.SERVER === 'deployed') {
    return {
      user: 'openab',
      database: 'openab',
      password: '&$X7zs#GH9Z7',  // TODO: don't publish this to the world!
      host: 'openab.cj3poakpg8kc.us-west-2.rds.amazonaws.com',
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
