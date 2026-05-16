import clsx from "clsx";
import type { HTMLAttributes, TargetedEvent } from "preact";
import type { ReactNode } from "preact/compat";

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
        "chat-input__wrapper",
        { "has-start-content": hasStartContent },
        { "has-end-content": hasEndContent },
        className,
      )}
      {...props}
    >
      {startContent}
      <input class={"chat-input"} value={value} onChange={handleValueChange} />
      {endContent}
    </label>
  );
};
