import { Todo } from "@shared/types";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-title">{todo.title}</span>
      </label>
      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}
      <button className="todo-delete" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}
