import Knex from 'knex';

const UP_SQL = `
CREATE TABLE "sample" (
    id serial,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TRIGGER sample_update_timestamp BEFORE UPDATE
ON "sample" FOR EACH ROW EXECUTE PROCEDURE
update_timestamp();
`;

const DOWN_SQL = `
DROP TABLE "sample";
DRIP TRIGGER sample_update_timestamp;
`;

export async function up (knex:Knex) {
  return knex.raw(UP_SQL);
}

export async function down (knex:Knex) {
  return knex.raw(DOWN_SQL);
}
