import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "preact";
import "../styles/button.css";

const button = cva("button", {
  variants: {
    variant: {
      solid: "solid",
      ghost: "ghost",
      outlined: "outlined",
      soft: "soft",
    },
    size: {
      sm: "sm",
      md: "md",
      lg: "lg",
    },
    isIconOnly: {
      true: "iconOnly",
    },
    isLoading: {
      true: "loading",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = ({
  variant,
  size,
  isIconOnly,
  isLoading,
  class: className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      type="button"
      class={button({ variant, size, isIconOnly, isLoading, className })}
      disabled={!!isLoading}
      {...props}
    >
      {isLoading && <span class="spinner" aria-hidden="true" />}
      {children}
    </button>
  );
};
