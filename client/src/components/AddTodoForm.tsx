import { useState, FormEvent } from "react";

interface Props {
  onAdd: (title: string, description: string) => void;
}

export default function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input todo-input-desc"
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
}
