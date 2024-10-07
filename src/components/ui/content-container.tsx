import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

type ContentContainerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const ContentContainer = ({
  children,
  className,
  ...props
}: ContentContainerProps) => {
  return (
    <main
      {...props}
      className={cn(
        "flex h-full w-full max-w-3xl flex-col bg-zinc-800 md:rounded-md",
        className,
      )}
    >
      {children}
    </main>
  );
};

export default ContentContainer;
