import { forwardRef } from "react";
import { Title } from "@radix-ui/react-toast";

import { cn } from "@/utils";

export const ToastTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(function ToastTitle({ className, ...props }, ref) {
  return (
    <Title
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
});
