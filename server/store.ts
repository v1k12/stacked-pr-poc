import { v4 as uuidv4 } from "uuid";
import { Todo, CreateTodoInput, UpdateTodoInput } from "../shared/types";

const todos: Map<string, Todo> = new Map();

export function getAllTodos(): Todo[] {
  return Array.from(todos.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getTodoById(id: string): Todo | undefined {
  return todos.get(id);
}

export function createTodo(input: CreateTodoInput): Todo {
  const now = new Date().toISOString();
  const todo: Todo = {
    id: uuidv4(),
    title: input.title,
    description: input.description ?? "",
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
  todos.set(todo.id, todo);
  return todo;
}

export function updateTodo(id: string, input: UpdateTodoInput): Todo | null {
  const existing = todos.get(id);
  if (!existing) return null;

  const updated: Todo = {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  };
  todos.set(id, updated);
  return updated;
}

export function deleteTodo(id: string): boolean {
  return todos.delete(id);
}
