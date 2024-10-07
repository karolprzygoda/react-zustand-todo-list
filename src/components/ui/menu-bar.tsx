import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

type MenuBarProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const MenuBar = ({ children, className, ...props }: MenuBarProps) => {
  return (
    <section
      {...props}
      className={cn(
        "flex w-full justify-center border-b border-neutral-900",
        className,
      )}
    >
      {children}
    </section>
  );
};

type MenuButtonProps = {
  children: ReactNode;
  isActive?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const MenuBarButton = ({
  children,
  isActive,
  className,
  ...props
}: MenuButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        `relative px-2 py-4 font-semibold transition-colors ${isActive ? 'text-zinc-200 before:absolute before:left-1/2 before:top-[97%] before:h-[3px] before:w-full before:-translate-x-1/2 before:rounded-xl before:bg-rose-500 before:content-[""]' : "text-zinc-500 hover:text-zinc-200"}`,
        className,
      )}
    >
      {children}
    </button>
  );
};

export { MenuBar, MenuBarButton };
