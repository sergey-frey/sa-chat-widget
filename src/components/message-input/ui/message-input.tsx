import { RiSendInsFill } from "@remixicon/react";
import clsx from "clsx";
import { useRef, useState } from "preact/hooks";
import { ChatInput } from "@/components/chat-input";
import { Button } from "@/shared/ui/button";
import styles from "../styles/message-input.module.scss";

interface IProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: IProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;

    setValue("");
    onSend(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBlur = (e: FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setFocused(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      class={styles.root}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
    >
      <ChatInput
        value={value}
        onValueChange={setValue}
        onKeyDown={handleKeyDown}
        endContent={
          <Button
            variant="ghost"
            isIconOnly
            size="sm"
            onClick={handleSend}
            disabled={!value.trim() || disabled}
          >
            <RiSendInsFill style={{ width: "1rem", height: "1rem" }} />
          </Button>
        }
      />
      <p class={clsx(styles.hint, { [styles.hintVisible]: focused })}>
        <kbd>Shift</kbd> + <kbd>Enter</kbd> — новая строка
      </p>
    </div>
  );
}
