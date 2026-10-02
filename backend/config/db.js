// to establish an asynchronous MySQL connection pool using mysql2/promise:
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create reusable database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Max concurrent database connections
  queueLimit: 0,
});

// Test database connection on server initialization
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Successfully connected to MySQL Database!");
    connection.release(); // Release connection back to pool
  } catch (error) {
    console.error("❌ MySQL Database Connection Failed:", error.message);
  }
}

export default pool;