import Knex from 'knex';

const UP_SQL = `
CREATE TABLE "user" (
    id serial,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    email text UNIQUE NOT NULL,
    role text NOT NULL DEFAULT 'user'::text,
    points int4 NOT NULL DEFAULT 0,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TRIGGER user_update_timestamp BEFORE UPDATE
ON "user" FOR EACH ROW EXECUTE PROCEDURE
update_timestamp();
`;

const DOWN_SQL = `
DROP TABLE "user";
DRIP TRIGGER user_update_timestamp;
`;

export async function up (knex:Knex) {
  return knex.raw(UP_SQL);
}

export async function down (knex:Knex) {
  return knex.raw(DOWN_SQL);
}
