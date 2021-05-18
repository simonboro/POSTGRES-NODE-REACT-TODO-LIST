const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

//create new todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const createTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *", //RETURNING * -> return data after action in value named "rows"
      [description]
    );

    res.json(createTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(oneTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update todo description
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//mark todo as done
app.put("/todos/done/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateTodo = await pool.query(
      "UPDATE todo SET isDone = $1 WHERE todo_id = $2",
      [true, id]
    );

    res.json("Todo was marked as done");
  } catch (err) {
    console.error(err.message);
  }
});

//mark todo as undone
app.put("/todos/undone/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateTodo = await pool.query(
      "UPDATE todo SET isDone = $1 WHERE todo_id = $2",
      [false, id]
    );

    res.json("Todo was marked as undone");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
