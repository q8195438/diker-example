import { init, createApp } from 'diker';
import config from 'config';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import jwt from 'koa-jwt';
import Knex from 'knex';

export const app = new Koa();
if (!config.disableLogger) {
  app.use(koaLogger());
}
app.use(jwt({ secret: config.jwt.secret, passthrough: true }));

const knex = Knex({
  client: 'pg',
  connection: config.database,
});

init(__dirname, knex);

createApp(app, {
  authorizationChecker: ({context: {session: user}}, roles:string[]) =>
  !!user && roles.every(role => user.roles.includes(role)),
});
