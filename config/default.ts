import { N, B, S } from './util';

const e = process.env;

const isTest = e.NODE_ENV === 'test';

export default {
  env: 'prod',
  port: N('PORT', 3333),
  appKeys: S('APP_KEYS', '_1539234115718_6334'),
  disableLogger: B('DISABLE_LOG', false),
  routePrefix: S('ROUTE_PREFIX', '/api'),
  database: {
    // host
    host: S('DB_HOST', '127.0.0.1'),
    // port
    port: N('DB_PORT', 5432),
    // username
    user: S('DB_USER', 'dev'),
    // password
    password: S('DB_PASS', 'dev'),
    // database
    database: S(isTest ? 'DB_TEST_NAME' : 'DB_NAME', 'dev'),
  },
  jwt: {
    secret: e.JWT_SECRET!,
    expiresIn: S('JWT_EXPIRES_IN', '365 days'),
    algorithm: S('JWT_ALGORITHM', 'HS256'),
  },
};
