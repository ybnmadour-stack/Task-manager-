const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

const config = {
  connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;TrustServerCertificate=Yes;`
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