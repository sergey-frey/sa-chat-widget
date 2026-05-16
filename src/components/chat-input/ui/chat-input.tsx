import clsx from "clsx";
import type { HTMLAttributes, TargetedEvent } from "preact";
import type { ReactNode } from "preact/compat";
import styles from "../styles/chat-input.module.scss";

interface IProps extends HTMLAttributes<HTMLLabelElement> {
  value: string;
  onValueChange: (value: string) => void;

  startContent?: ReactNode;
  endContent?: ReactNode;
}

export const ChatInput = ({
  value,
  onValueChange,
  class: className,
  startContent,
  endContent,
  ...props
}: IProps) => {
  const handleValueChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
    const value = (e.target as HTMLInputElement).value;

    onValueChange(value);
  };

  const hasStartContent = startContent !== undefined;
  const hasEndContent = endContent !== undefined;

  return (
    <label
      class={clsx(
        styles["chat-input__wrapper"],
        { [styles["has-start-content"]]: hasStartContent },
        { [styles["has-end-content"]]: hasEndContent },
        className,
      )}
      {...props}
    >
      {startContent}
      <input class={styles["chat-input"]} value={value} onChange={handleValueChange} />
      {endContent}
    </label>
  );
};
