import { useContainer, buildSchemaSync } from 'type-graphql';
import { graphqlKoa } from 'apollo-server-koa/dist/koaApollo';
import path from 'path';
import { container } from 'diker';
import { Context } from 'koa';
import bodyParser from 'koa-bodyparser';

useContainer(container);

const schema = buildSchemaSync({
  resolvers: [
    path.join(__dirname, '../resolvers/*'),
  ],
});

const middleware = graphqlKoa({schema});
const parser = bodyParser();
export default async function (ctx:Context, next:any) {
  if (ctx.req.url !== '/graphql') {
    return next();
  }
  return parser(ctx, () => middleware(ctx, next) as any);
}
