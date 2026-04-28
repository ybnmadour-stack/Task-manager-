const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server ✅");
    return pool;
  })
  .catch((err) => {
    console.error("SQL Server connection failed ❌", err);
  });

async function testConnection() {
  const pool = await poolPromise;
  await pool.request().query("SELECT 1 AS connected");
}

module.exports = { sql, poolPromise, testConnection };