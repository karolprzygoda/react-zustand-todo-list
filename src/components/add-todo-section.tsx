import { Input } from "@/components/ui/input.tsx";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import useTodoStore from "@/stores/todoStore.ts";
import { toast } from "@/hooks/use-toast.ts";
import { ChangeEvent, FormEvent, useState } from "react";

const AddTodoSection = () => {
  const { currentDate, todos, addTodo } = useTodoStore((state) => state);

  const [todoDescription, setTodoDescription] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(currentDate);
    setTodoDescription("");
    if (todoDescription.length > 0) {
      addTodo({
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
        todoDescription,
        day: currentDate,
        isChecked: false,
        isPinned: false,
      });
      toast({
        title: "Task added",
        description:
          "Task is set to " +
          currentDate.toLocaleString().slice(0, 10).replace("T", " "),
      });
    }
  };

  return (
    <form
      className={"mx-5 mb-14 md:mx-20"}
      onSubmit={handleSubmit}
      noValidate
      autoComplete={"off"}
    >
      <span className={"relative"}>
        <ActivityLogIcon
          className={"absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"}
        />
        <Input
          value={todoDescription}
          onChange={handleChange}
          name={"add-todo-input"}
          aria-label={"Add new task"}
          className={
            "text-md border-neutral-950 bg-neutral-900 py-6 ps-10 text-zinc-200 placeholder:text-zinc-500"
          }
          type={"text"}
          placeholder={"Add your task..."}
        />
      </span>
    </form>
  );
};

export default AddTodoSection;
