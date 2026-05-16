import {
  RiSendBackward,
  RiSendInsFill,
  RiSendPlane2Line,
} from "@remixicon/react";
import { useState } from "preact/hooks";
import { Button } from "@/components/button";
import { ChatInput } from "@/components/chat-input";

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section class={"root light"}>
      <div />
      <div />
      <ChatInput
        value={value}
        onValueChange={setValue}
        endContent={
          <Button isIconOnly size="sm">
            <RiSendInsFill style={{ width: "0.75rem", height: "0.75rem" }} />
          </Button>
        }
      />
    </section>
  );
}
