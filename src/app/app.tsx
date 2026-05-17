import { RiMoonLine, RiSendInsFill, RiSunLine } from "@remixicon/react";
import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";
import { ChatInput } from "@/components/chat-input";
import { useCreateChat } from "@/entites/chats";
import { AppDataProvider } from "@/shared/lib/app-data-provider";
import { Button } from "@/shared/ui/button";
import styles from "./styles/app.module.scss";

type Theme = "light" | "dark";

interface IProps {
  productId: number;
  chatId: string;
  isNewChat: boolean;
}

export function App({ productId, chatId, isNewChat }: IProps) {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const { mutate } = useCreateChat();

  useEffect(() => {
    if (!isNewChat) {
      return;
    }

    mutate({ productId });
  }, []);

  return (
    <AppDataProvider
      productId={productId}
      chatId={chatId}
      isNewChat={isNewChat}
    >
      <section class={clsx(styles.root, styles[theme])}>
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
    </AppDataProvider>
  );
}
