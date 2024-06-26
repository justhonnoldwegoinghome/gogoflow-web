import { forwardRef } from "react";
import { Description } from "@radix-ui/react-toast";

import { cn } from "@/utils/cn";

export const ToastDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <Description
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  );
});
