import { useMemo } from "react";
import { isSameDay, isSameMonth, isSameYear } from "@/lib/utils.ts";
import { useShallow } from "zustand/react/shallow";
import useTodoStore, { Todo } from "@/stores/todoStore.ts";

const useFilteredTodos = () => {
  const { currentDate, todos, timeRange } = useTodoStore(
    useShallow((state) => ({
      currentDate: state.currentDate,
      todos: state.todos,
      timeRange: state.timeRange,
    })),
  );

  return useMemo(() => {
    const currentDateObj = new Date(currentDate);

    const filterTodo = (todo: Todo) => {
      const todoDate = new Date(todo.day);
      switch (timeRange) {
        case "Day":
          return isSameDay(todoDate, currentDateObj);
        case "Month":
          return isSameMonth(todoDate, currentDateObj);
        case "Year":
          return isSameYear(todoDate, currentDateObj);
        default:
          return false;
      }
    };

    return todos.filter(filterTodo);
  }, [todos, currentDate, timeRange]);
};

export default useFilteredTodos;
