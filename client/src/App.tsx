import { useEffect, useMemo, useState } from "react";
import { Todo } from "@shared/types";
import * as api from "./api";
import AddTodoForm from "./components/AddTodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";

type Filter = "all" | "active" | "completed";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.fetchTodos().then((data) => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const activeCount = todos.filter((t) => !t.completed).length;

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (filter === "active") result = result.filter((t) => !t.completed);
    if (filter === "completed") result = result.filter((t) => t.completed);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [todos, filter, search]);

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
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
        totalCount={todos.length}
        activeCount={activeCount}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
