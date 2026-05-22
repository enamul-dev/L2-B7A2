import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",       // replace with your DB username
  host: "localhost",      // or your DB host
  database: "mydb",       // replace with your DB name
  password: "password",   // replace with your DB password
  port: 5432,             // default PostgreSQL port
});

export default pool;