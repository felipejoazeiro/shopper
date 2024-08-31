import pgPromise from 'pg-promise';

const pgp = pgPromise();

const db = pgp({
  host: process.env.DB_HOST ?? 'default-host',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  database: process.env.DB_NAME ?? 'default-database',
  user: process.env.DB_USER ?? 'default-user',
  password: process.env.DB_PASSWORD ?? 'default-password',
  ssl: false
});

export { db };