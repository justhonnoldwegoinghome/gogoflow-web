import { forwardRef } from "react";
import { Viewport } from "@radix-ui/react-toast";

import { cn } from "@/utils/cn";

export const ToastViewport = forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return (
    <Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  );
});
