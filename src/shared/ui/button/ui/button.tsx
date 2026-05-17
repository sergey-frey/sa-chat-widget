import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "preact";
import styles from "../styles/button.module.scss";

const button = cva(styles.button, {
  variants: {
    variant: {
      solid: styles.solid,
      ghost: styles.ghost,
      outlined: styles.outlined,
      soft: styles.soft,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    isIconOnly: {
      true: styles.iconOnly,
    },
    isLoading: {
      true: styles.loading,
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
  const needToHideChildren = isIconOnly && isLoading;

  return (
    <button
      type="button"
      class={button({ variant, size, isIconOnly, isLoading, className })}
      disabled={!!isLoading}
      {...props}
    >
      {isLoading && <span class={styles.spinner} aria-hidden="true" />}
      {!needToHideChildren && children}
    </button>
  );
};
