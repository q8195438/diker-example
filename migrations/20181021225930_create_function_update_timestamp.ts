import Knex from 'knex';

const UP_SQL = `
CREATE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
`;

const DOWN_SQL = `
DROP FUNCTION update_timestamp();
`;

export async function up (knex:Knex) {
  return knex.raw(UP_SQL);
}

export async function down (knex:Knex) {
  return knex.raw(DOWN_SQL);
}
