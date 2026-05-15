import { RiLoaderLine } from "@remixicon/react";
import type { ComponentProps, JSX } from "preact";
import { forwardRef } from "preact/compat";
import { opacity, transforms, transitions } from "@/shared/config/tokens";
import type { RecipeVariantProps } from "@/shared/styled-system/css";
import { css, cva, cx } from "@/shared/styled-system/css";

const button = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5",
    fontFamily: "inherit",
    fontWeight: "500",
    lineHeight: "1",
    borderRadius: "control",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: transitions.interactive,
    userSelect: "none",
    whiteSpace: "nowrap",
    outline: "none",
    flexShrink: "0",
    textDecoration: "none",
    _disabled: {
      opacity: opacity.disabled,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    _focusVisible: {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "accent.focusRing",
      outlineOffset: "2px",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "accent.default",
        color: "white",
        _hover: { bg: "accent.hover" },
        _active: { bg: "accent.active", transform: transforms.pressScale },
      },
      secondary: {
        bg: "surface.default",
        color: "text.primary",
        borderColor: "border.default",
        _hover: { bg: "surface.hover", borderColor: "border.hover" },
        _active: { bg: "surface.active", transform: transforms.pressScale },
      },
      ghost: {
        bg: "transparent",
        color: "text.muted",
        _hover: { bg: "surface.default", color: "text.primary" },
        _active: { bg: "surface.hover", transform: transforms.pressScale },
      },
      outline: {
        bg: "transparent",
        color: "accent.default",
        borderColor: "accent.border",
        _hover: {
          bg: "accent.bgHover",
          borderColor: "accent.borderHover",
        },
        _active: { bg: "accent.bgActive", transform: transforms.pressScale },
      },
      danger: {
        bg: "danger.default",
        color: "white",
        _hover: { bg: "danger.hover" },
        _active: { bg: "danger.active", transform: transforms.pressScale },
      },
      link: {
        bg: "transparent",
        color: "accent.default",
        h: "auto!",
        px: "0!",
        minH: "auto",
        borderRadius: "inline",
        _hover: { color: "accent.light", textDecoration: "underline" },
      },
    },
    size: {
      xs: { h: "6", px: "2.5", fontSize: "xs", borderRadius: "controlSm" },
      sm: { h: "8", px: "3.5", fontSize: "sm" },
      md: { h: "10", px: "5", fontSize: "sm" },
      lg: { h: "12", px: "6", fontSize: "md" },
    },
    fullWidth: {
      true: { w: "full" },
    },
    loading: {
      true: { pointerEvents: "none", opacity: opacity.loading },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariantProps = RecipeVariantProps<typeof button>;

export interface ButtonProps
  extends Omit<ComponentProps<"button">, "size">,
    ButtonVariantProps {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      fullWidth,
      loading,
      leftIcon,
      rightIcon,
      loadingText,
      class: className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const [variantProps, elementProps] = button.splitVariantProps({
      variant,
      size,
      fullWidth,
      loading,
    });

    return (
      <button
        ref={ref}
        class={cx(button(variantProps), className as string)}
        disabled={disabled || !!loading}
        {...elementProps}
        {...rest}
      >
        {loading ? (
          <>
            <RiLoaderLine
              size={size === "xs" || size === "sm" ? 14 : 16}
              class={css({ animation: "spin", flexShrink: "0" })}
            />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
