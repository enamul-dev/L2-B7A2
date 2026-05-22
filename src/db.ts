import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",       // replace with your DB username
  host: "localhost",      // or your DB host
  database: "postgres",       // replace with your DB name
  password: "54321",   // replace with your DB password
  port: 5432,             // default PostgreSQL port
});

export default pool;