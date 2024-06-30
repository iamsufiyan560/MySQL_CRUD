const db = require("../database");

const createTask = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const { task_name, is_done } = req.body;
    console.log(req.body);
    const query = "INSERT INTO tasks (task_name, is_done) VALUES (?, ?)";
    const [result] = await conn.execute(query, [task_name, is_done]);
    console.log("Inserted ID:", result.insertId);
    res.status(201).json({ data: "Task created" });
  } catch (err) {
    console.log("Error whie createTask", err);
    throw err;
  } finally {
    conn.release();
  }
};

const fetchTasks = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const query = `SELECT * FROM tasks`;
    const [rows] = await conn.execute(query);
    res.status(200).json({ data: rows });
  } catch (err) {
    console.log("Error whie fetchTasks", err);
    throw err;
  } finally {
    console.log("DB conn released");
    conn.release();
  }
};

const fetchTaskById = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const id = req.params.id;
    const query = `SELECT * FROM tasks WHERE id=${id}`;
    const [rows] = await conn.execute(query);
    res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.log("Error whie fetchTaskById", err);
    throw err;
  } finally {
    console.log("DB conn released");
    conn.release();
  }
};

const updateTaskById = async (req, res) => {
  let conn;
  try {
    const { task_name, is_done } = req.body;
    const id = parseInt(req.params.id);
    conn = await db.getConnection();
    const query =
      "UPDATE tasks SET task_name=?, is_done=?, updated_at=? WHERE id=?";
    const [result] = await conn.execute(query, [
      task_name,
      is_done,
      new Date(),
      id,
    ]);
    console.log("Record Updated : ", result);
    res.status(200).json({ data: "Task Updated" });
  } catch (err) {
    console.log("Error whie updateTaskById", err);
    throw err;
  } finally {
    console.log("DB conn released");
    conn.release();
  }
};

const deleteTaskById = async (req, res) => {
  let conn;
  try {
    const id = req.params.id;
    conn = await db.getConnection();
    const query = "DELETE FROM tasks WHERE id = ?";
    const [result] = await conn.execute(query, [id]);
    console.log("Rows affected:", result.affectedRows);
    res.status(200).json({ data: "Task Deleted" });
  } catch (err) {
    console.log("Error whie deleteTaskById", err);
    throw err;
  } finally {
    console.log("DB conn released");
    conn.release();
  }
};

module.exports = {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
