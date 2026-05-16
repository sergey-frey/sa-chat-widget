import { RiSendInsFill } from "@remixicon/react";
import { useState } from "preact/hooks";
import { Button } from "@/components/button";
import { ChatInput } from "@/components/chat-input";
import styles from "./styles/app.module.scss";

export function App() {
  const [value, setValue] = useState("");

  return (
    <section class={`${styles.root} ${styles.light}`}>
      <div />
      <div />
      <ChatInput
        value={value}
        onValueChange={setValue}
        endContent={
          <Button variant="ghost" isIconOnly size="sm">
            <RiSendInsFill style={{ width: "1rem", height: "1rem" }} />
          </Button>
        }
      />
    </section>
  );
}
