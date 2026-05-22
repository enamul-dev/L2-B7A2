"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres", // replace with your DB username
    host: "localhost", // or your DB host
    database: "mydb", // replace with your DB name
    password: "password", // replace with your DB password
    port: 5432, // default PostgreSQL port
});
exports.default = pool;
