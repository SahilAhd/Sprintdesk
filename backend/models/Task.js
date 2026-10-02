import db from "../config/db.js";

// UPDATE TASK BY ID
export async function updateTask(id, updates) {
  const keys = Object.keys(updates);
  if (keys.length === 0) return;

  // Build dynamic SQL query: "SET status = ?, priority = ?"
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = [...Object.values(updates), id];

  const query = `UPDATE tasks SET ${setClause} WHERE id = ?`;

  const [result] = await db.query(query, values);
  return result;
}

// GET ALL TASKS
export async function getAllTasks() {
  const [rows] = await db.query("SELECT * FROM tasks ORDER BY created_at DESC");
  return rows;
}

// CREATE TASK
export async function createTask(taskData) {
  const { id, title, status, priority, due_date, user_id, comments } = taskData;
  const query = `
    INSERT INTO tasks (id, title, status, priority, due_date, user_id, comments)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const commentsJson = JSON.stringify(comments || []);
  const [result] = await db.query(query, [
    id,
    title,
    status,
    priority,
    due_date,
    user_id,
    commentsJson,
  ]);
  return result;
}

// DELETE TASK
export async function deleteTask(id) {
  const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
  return result;
}