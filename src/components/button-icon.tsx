import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils.ts";

type ButtonIconProps = {
  children: React.ReactNode;
  classname?: string;
} & ButtonProps;

const ButtonIcon = ({ children, classname, ...props }: ButtonIconProps) => {
  return (
    <Button {...props} className={cn(classname, "bg-transparent")} size="icon">
      {children}
    </Button>
  );
};

export default ButtonIcon;
