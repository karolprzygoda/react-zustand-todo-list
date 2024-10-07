import { HTMLProps, ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

type TodosListProps = {
  children: ReactNode;
} & HTMLProps<HTMLDivElement>;

const TodosList = ({ children, className, ...rest }: TodosListProps) => {
  return (
    <div
      {...rest}
      className={cn("overflow-y-auto overflow-x-hidden", className)}
    >
      {children}
    </div>
  );
};

export default TodosList;
