import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border text-base font-medium tracking-wide ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary/30 hover:bg-primary/90 hover:border-primary/50 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground border-destructive/30 hover:bg-destructive/90 hover:border-destructive/50 shadow-md",
        outline: "bg-transparent text-primary border-primary/40 hover:bg-primary/10 hover:text-primary/90",
        secondary: "bg-secondary text-secondary-foreground border-secondary/30 hover:bg-secondary/90 hover:border-secondary/50",
        ghost: "bg-transparent text-foreground border-none hover:bg-muted hover:text-foreground",
        link: "text-primary underline underline-offset-4 hover:text-primary/80 bg-transparent border-none",
        pirate: "bg-accent/20 text-accent-foreground border-accent/40 hover:bg-accent/30 hover:text-accent-foreground font-semibold tracking-wider shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2 text-base",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-12 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
