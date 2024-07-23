import express from "express";
import mysql from 'mysql2';
import cors from 'cors';
import { uuidv4,formatDate } from "./utils.js";

// VANILLA MYSQL
const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Huyphan05112005@',
  database: 'todolist'
}).promise(); 

app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM tasks");
    console.log(results);
    res.send(results); 
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Failed to connect to the database');
  }
});

//Fetching tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const [results] = await pool.query(`SELECT * FROM tasks`); // Fetch all tasks
    res.send(results);
  } catch (err) {
    console.error('Failed to retrieve tasks:', err);
    res.send('Error fetching tasks from database');
  }
});

//Adding new task to database
app.post("/api/tasks", async (req, res) => {
  try {
    const { task } = req.body;
    const id = uuidv4();
    const date = formatDate();
    const importance = false;
    const completed = false;
    const newTask = await pool.query(`
      INSERT INTO tasks (id, task, date, importance, completed)
      VALUES (?,?,?,?,?)`,[id,task,date,importance,completed])
    console.log('New task created:', newTask);  
    res.json({id: id, task: task, date: date, importance: importance, completed: completed });
  } catch (err){
    console.error('Error creating task:', err);
    res.send('Failed to create task');
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { task, date, importance, completed } = req.body; 

  let query = 'UPDATE tasks SET ';
  const updates = [];
  const params = [];

  if (task !== undefined) {
    updates.push('task = ?');
    params.push(task);
  }
  if (date !== undefined) {
    updates.push('date = ?');
    params.push(date);
  }
  if (importance !== undefined) {
    updates.push('importance = ?');
    params.push(importance);
  }
  if (completed !== undefined) {
    updates.push('completed = ?');
    params.push(completed);
  }

  query += updates.join(', ');
  query += ' WHERE id = ?';
  params.push(taskId);

  console.log("Executing query:", query);
  console.log("With parameters:", params);

  try {
    const [result] = await pool.query(query, params);
    res.send('Task updated successfully');
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Failed to update task');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});