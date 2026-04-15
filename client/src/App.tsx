import { useEffect, useState } from "react";
import { Todo } from "@shared/types";
import * as api from "./api";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchTodos().then((data) => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  async function handleAdd(title: string, description: string) {
    const todo = await api.createTodo({ title, description });
    setTodos((prev) => [todo, ...prev]);
  }

  async function handleToggle(id: string) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updated = await api.updateTodo(id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await api.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app">
      <h1>Todo App</h1>
      <AddTodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
