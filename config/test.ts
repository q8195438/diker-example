const e = process.env;

export default {
  env: 'test',
  disableLogger: true,
  database: {
    database: e.TEST_DB_NAME,
  },
};
