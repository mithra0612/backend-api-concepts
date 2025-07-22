const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());

const tasks = [];
app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;
  if (title.length > 100 || title.length == 0)
    res.status(400).send({
      error: "Title must be a non-empty string under 100 characters.",
    });
  if (description.length > 500)
    res.status(400).send({
      error: "Description must be under 500 characters.",
    });
  const task = {
    id: uuidv4(),
    title: title,
    description: description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  console.log(task);
  res.status(201).json(task);
});

app.get("/api/tasks", (req, res) => {
  res.status(201).json(tasks);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const idx = tasks.findIndex((task) => task.id === id);

  if (idx === -1) {
    return res.status(404).send({
      error: "Task with given id not found.",
    });
  }

  tasks.splice(idx, 1);
  res.status(200).send("Deleted");
});

app.put("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const idx = tasks.findIndex((task) => task.id == id);
  if (idx == -1) {
    res.status(404).send({ error: "id not found" });
  }
  else{
    tasks[idx].completed = true;
    res.status(200).send("Task updated to completed.");
  }
});

app.listen(3000, () =>
  console.log("App is now running in http://localhost:3000/")
);
