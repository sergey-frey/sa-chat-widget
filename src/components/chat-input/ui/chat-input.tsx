import clsx from "clsx";
import type { HTMLAttributes, TargetedEvent } from "preact";
import type { ReactNode } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";
import styles from "../styles/chat-input.module.scss";

interface IProps extends Omit<HTMLAttributes<HTMLLabelElement>, "onKeyDown"> {
  value: string;
  onValueChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent) => void;

  startContent?: ReactNode;
  endContent?: ReactNode;

  maxRows?: number;
}

export const ChatInput = ({
  value,
  onValueChange,
  onKeyDown,
  class: className,
  startContent,
  endContent,
  maxRows = 7,
  ...props
}: IProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiRow, setIsMultiRow] = useState(false);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const maxHeight =
      lineHeight * maxRows +
      parseFloat(getComputedStyle(el).paddingTop) +
      parseFloat(getComputedStyle(el).paddingBottom);
    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${newHeight}px`;
    setIsMultiRow(newHeight > lineHeight * 1.5);
  }, [value, maxRows]);

  const handleValueChange = (e: TargetedEvent<HTMLTextAreaElement, Event>) => {
    onValueChange((e.target as HTMLTextAreaElement).value);
  };

  const hasStartContent = startContent !== undefined;
  const hasEndContent = endContent !== undefined;

  return (
    <label
      class={clsx(
        styles["chat-input__wrapper"],
        { [styles["has-start-content"]]: hasStartContent },
        { [styles["has-end-content"]]: hasEndContent },
        { [styles["multi-rows"]]: isMultiRow },
        className,
      )}
      {...props}
    >
      {startContent}
      <textarea
        ref={textareaRef}
        class={styles["chat-input"]}
        value={value}
        rows={1}
        onInput={handleValueChange}
        onKeyDown={onKeyDown}
        placeholder={"Enter your question..."}
      />
      {endContent}
    </label>
  );
};
