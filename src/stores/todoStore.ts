import { create } from "zustand";
import { TimeRangeType } from "@/lib/utils.ts";
import { persist } from "zustand/middleware";

export type Todo = {
  id: number;
  todoDescription: string;
  day: Date;
  isPinned: boolean;
  isChecked: boolean;
};

type State = {
  todos: Todo[];
  currentDate: Date;
  timeRange: TimeRangeType;
};

type Actions = {
  editTodo: (id: number, todo: string) => void;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  incrementDay: () => void;
  setTimeRange: (timeRange: TimeRangeType) => void;
  setIsChecked: (id: number) => void;
  setIsPinned: (id: number) => void;
  decrementDay: () => void;
};

const useTodoStore = create<State & Actions>()(
  persist(
    (set) => ({
      currentDate: new Date(),
      timeRange: "Day",
      todos: [],
      setTimeRange: (timeRange) => {
        set(() => ({
          timeRange: timeRange,
        }));
      },
      setIsPinned: (id) => {
        set(({ todos }) => ({
          todos: todos.map((todo) =>
            todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo,
          ),
        }));
      },
      setIsChecked: (id) => {
        set(({ todos }) => ({
          todos: todos.map((todo) =>
            todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo,
          ),
        }));
      },
      incrementDay: () => {
        set(({ currentDate, timeRange }) => {
          const date =
            typeof currentDate === "string"
              ? new Date(currentDate)
              : currentDate;
          switch (timeRange) {
            case "Day": {
              return {
                currentDate: new Date(date.setDate(date.getDate() + 1)),
              };
            }
            case "Month": {
              return {
                currentDate: new Date(date.setMonth(date.getMonth() + 1)),
              };
            }
            case "Year": {
              return {
                currentDate: new Date(date.setFullYear(date.getFullYear() + 1)),
              };
            }
          }
        });
      },
      decrementDay: () => {
        set(({ currentDate, timeRange }) => {
          const date =
            typeof currentDate === "string"
              ? new Date(currentDate)
              : currentDate;
          switch (timeRange) {
            case "Day": {
              return {
                currentDate: new Date(date.setDate(date.getDate() - 1)),
              };
            }
            case "Month": {
              return {
                currentDate: new Date(date.setMonth(date.getMonth() - 1)),
              };
            }
            case "Year": {
              return {
                currentDate: new Date(date.setFullYear(date.getFullYear() - 1)),
              };
            }
          }
        });
      },
      editTodo: (id, todoDescription) => {
        set(({ todos }) => ({
          todos: todos.map((todo) =>
            todo.id === id
              ? { ...todo, todoDescription: todoDescription }
              : todo,
          ),
        }));
      },
      addTodo: (newTodo) => {
        set(({ todos }) => ({
          todos: [...todos, newTodo],
        }));
      },
      deleteTodo: (id) => {
        set(({ todos }) => ({
          todos: todos.filter((todo) => todo.id !== id),
        }));
      },
    }),
    { name: "todo-storage" },
  ),
);

export default useTodoStore;
