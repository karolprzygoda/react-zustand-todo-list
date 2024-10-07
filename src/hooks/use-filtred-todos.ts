import useTodoStore, { Todo } from "@/stores/todoStore.ts";
import { useMemo } from "react";
import { isSameDay, isSameMonth, isSameYear } from "@/lib/utils.ts";

const useFilteredTodos = () => {
  const { currentDate, todos, timeRange } = useTodoStore();

  return useMemo(() => {
    const filterTodo = (todo: Todo) => {
      const todoDate = new Date(todo.day);
      switch (timeRange) {
        case "Day":
          return isSameDay(todoDate, currentDate);
        case "Month":
          return isSameMonth(todoDate, currentDate);
        case "Year":
          return isSameYear(todoDate, currentDate);
      }
    };

    return todos.filter(filterTodo);
  }, [todos, currentDate, timeRange]);
};

export default useFilteredTodos;
