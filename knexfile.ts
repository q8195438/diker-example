import config from 'config';

export = {
  client: 'pg',
  connection: config.database,
  migrations: {
    stub: 'scripts/migration-template.ts',
  },
};
