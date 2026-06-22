import dotenv from 'dotenv'
dotenv.config({ path: './server/.env' })

import pg from 'pg'

console.log({
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER
});

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)