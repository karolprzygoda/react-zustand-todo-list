import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

type AppContainerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const AppContainer = ({ children, className, ...props }: AppContainerProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex h-screen w-screen justify-center overflow-hidden bg-neutral-900",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AppContainer;
