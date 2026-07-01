import pg from 'pg'
const { Pool } = pg;

const connectionString =
  "postgresql://postgres:t5u3i8hAKi0xFA1BP7Ri@containers-us-west-194.railway.app:6020/railway";

export const pool = new Pool({
  connectionString,
});

export default pool;
