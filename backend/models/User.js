import pool from "../config/db.js";

// Find user by email
export async function findUserByEmail(email) {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}

// Create new user record
export async function createUser({ name, email, password, initials }) {
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password, initials) VALUES (?, ?, ?, ?)",
    [name, email, password, initials]
  );
  return result.insertId;
}