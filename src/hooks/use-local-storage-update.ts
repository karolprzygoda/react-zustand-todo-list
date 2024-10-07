import useTodoStore from "@/stores/todoStore.ts";
import { useEffect } from "react";

const useLocalStorageUpdate = () => {
  const todos = useTodoStore((state) => state.todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
};

export default useLocalStorageUpdate;
