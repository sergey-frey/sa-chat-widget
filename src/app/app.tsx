import { RiMoonLine, RiSendInsFill, RiSunLine } from "@remixicon/react";
import { useState } from "preact/hooks";
import { Button } from "@/components/button";
import { ChatInput } from "@/components/chat-input";
import styles from "./styles/app.module.scss";

type Theme = "light" | "dark";

export function App() {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <section class={`${styles.root} ${styles[theme]}`}>
      <header class={styles.header}>
        <span class={styles.title}>Sales Assistant</span>
        <Button
          variant="ghost"
          isIconOnly
          size="sm"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <RiMoonLine style={{ width: "1rem", height: "1rem" }} />
          ) : (
            <RiSunLine style={{ width: "1rem", height: "1rem" }} />
          )}
        </Button>
      </header>
      <div />
      <footer class={styles.footer}>
        <ChatInput
          value={value}
          onValueChange={setValue}
          endContent={
            <Button variant="ghost" isIconOnly size="sm">
              <RiSendInsFill style={{ width: "1rem", height: "1rem" }} />
            </Button>
          }
        />
      </footer>
    </section>
  );
}
