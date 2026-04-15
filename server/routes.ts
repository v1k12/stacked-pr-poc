import { Router } from "express";
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "./store";

const router = Router();

router.get("/todos", (_req, res) => {
  const todos = getAllTodos();
  res.json(todos);
});

router.get("/todos/:id", (req, res) => {
  const todo = getTodoById(req.params.id);
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(todo);
});

router.post("/todos", (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const todo = createTodo({ title, description });
  res.status(201).json(todo);
});

router.patch("/todos/:id", (req, res) => {
  const updated = updateTodo(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(updated);
});

router.delete("/todos/:id", (req, res) => {
  const deleted = deleteTodo(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.status(204).send();
});

export default router;
