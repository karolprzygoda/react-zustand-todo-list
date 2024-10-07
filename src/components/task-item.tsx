import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "@radix-ui/react-icons";
import { UpdateIcon } from "@radix-ui/react-icons";
import useTodoStore, { Todo } from "@/stores/todoStore.ts";
import { toast } from "@/hooks/use-toast.ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useShallow } from "zustand/react/shallow";

const TaskItem = ({ todo }: { todo: Todo }) => {
  const { deleteTodo, setIsChecked, setIsPinned, editTodo } = useTodoStore(
    useShallow((state) => ({
      deleteTodo: state.deleteTodo,
      setIsChecked: state.setIsChecked,
      setIsPinned: state.setIsPinned,
      editTodo: state.editTodo,
    })),
  );

  const [updateTask, setUpdateTask] = useState(todo.todoDescription);

  return (
    <div className={"relative flex w-full items-center justify-between py-5"}>
      <DrawingPinFilledIcon
        className={`absolute -left-10 h-4 w-4 text-rose-500 ${todo.isPinned ? "" : "hidden"}`}
      />
      <div className={"flex items-center overflow-hidden"}>
        <Checkbox
          onClick={() => setIsChecked(todo.id)}
          checked={todo.isChecked}
          className={"me-4 h-5 w-5"}
        />
        <span
          className={`max-w-[70%] overflow-hidden overflow-ellipsis whitespace-nowrap text-zinc-200 ${todo.isChecked && "text-zinc-400 line-through"}`}
        >
          {todo.todoDescription}
        </span>
      </div>
      <Popover>
        <PopoverTrigger>
          <DotsHorizontalIcon className={"h-6 w-6 text-zinc-200"} />
        </PopoverTrigger>
        <PopoverContent
          className={
            "flex w-32 flex-col items-start gap-4 border-zinc-500 bg-zinc-900 text-zinc-300"
          }
        >
          <button
            onClick={() => setIsPinned(todo.id)}
            className={"flex items-center gap-2 transition hover:text-zinc-50"}
          >
            {todo.isPinned ? (
              <>
                <DrawingPinFilledIcon />
                Unpin
              </>
            ) : (
              <>
                <DrawingPinFilledIcon />
                Pin
              </>
            )}
          </button>
          <Dialog>
            <DialogTrigger className={"flex items-center gap-2"}>
              <UpdateIcon />
              Edit
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Edit your task</DialogTitle>
              <DialogDescription>Make changes to your task</DialogDescription>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editTodo(todo.id, updateTask);
                }}
                className={"mt-4 flex flex-col items-start gap-4"}
                noValidate
                autoComplete={"off"}
              >
                <Input
                  onChange={(e) => setUpdateTask(e.target.value)}
                  name={"edit-todo-input"}
                  aria-label={"Edit your task"}
                  value={updateTask}
                />
                <DialogClose asChild>
                  <Button type="submit" variant="secondary">
                    Save
                  </Button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
          <button
            onClick={() => {
              deleteTodo(todo.id);
              toast({
                title: "Task deleted",
                className: "dark ",
              });
            }}
            className={"flex items-center gap-2 transition hover:text-zinc-50"}
          >
            <TrashIcon />
            Delete
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskItem;
