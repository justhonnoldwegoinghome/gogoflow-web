import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import { Spinner } from "@/components/spinner";

const variants = {
  variants: {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive:
      "bg-destructive text-destructive-foreground border border-destructive-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  sizes: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants.variants;
  size?: keyof typeof variants.sizes;
  isLoading?: boolean;
}

export function Button({
  type = "submit",
  className = "",
  variant = "default",
  size = "default",
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants.variants[variant],
        variants.sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? <Spinner /> : <span className="mx-2">{props.children}</span>}
    </button>
  );
}
