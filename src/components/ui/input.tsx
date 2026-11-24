import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Native, accessible input using the same owned-source pattern as shadcn/ui. */
export function Input({
  className,
  type = "text",
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn("input-control", className)}
      {...props}
    />
  );
}
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("input-control", className)}
      {...props}
    />
  );
}
