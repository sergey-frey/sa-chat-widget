import clsx from "clsx";
import type { HTMLAttributes, TargetedEvent } from "preact";
import type { ReactNode } from "preact/compat";
import styles from "../styles/chat-input.module.scss";

interface IProps extends Omit<HTMLAttributes<HTMLLabelElement>, "onKeyDown"> {
  value: string;
  onValueChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent) => void;

  startContent?: ReactNode;
  endContent?: ReactNode;
}

export const ChatInput = ({
  value,
  onValueChange,
  onKeyDown,
  class: className,
  startContent,
  endContent,
  ...props
}: IProps) => {
  const rows = value.split("\n").length;

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
        { [styles["multi-rows"]]: rows > 1 },
        className,
      )}
      {...props}
    >
      {startContent}
      <textarea
        class={styles["chat-input"]}
        value={value}
        rows={rows}
        onInput={handleValueChange}
        onKeyDown={onKeyDown}
      />
      {endContent}
    </label>
  );
};
