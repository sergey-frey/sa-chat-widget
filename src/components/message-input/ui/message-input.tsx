import { RiSendInsFill } from "@remixicon/react";
import { useState } from "preact/hooks";
import { ChatInput } from "@/components/chat-input";
import { Button } from "@/shared/ui/button";

interface IProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: IProps) {
  const [value, setValue] = useState("");

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

  return (
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
  );
}
