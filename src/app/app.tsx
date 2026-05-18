import { RiMoonLine, RiSunLine } from "@remixicon/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { ChatMessagesList } from "@/components/chat-messages-list";
import { MessageInput } from "@/components/message-input";
import { useGetMessages, useSendMessage } from "@/entites/messages";
import { useGetProduct } from "@/entites/products";
import { AppDataProvider } from "@/shared/lib/app-data-provider";
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { Button } from "@/shared/ui/button";
import type { IMessage } from "@/shared/schemas/message";
import styles from "./styles/app.module.scss";

type Theme = "light" | "dark";

interface IProps {
  productId: number;
  userChatId: string;
}

export function App({ productId, userChatId }: IProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const initialized = useRef(false);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const { data: product, loading: productLoading } = useGetProduct({ productId });
  const { data } = useGetMessages({ productId, userChatId });
  const { mutate, loading } = useSendMessage();

  useEffect(() => {
    if (data && !initialized.current) {
      initialized.current = true;
      setMessages(data);
    }
  }, [data]);

  const handleSend = async (content: string) => {
    const optimisticId = -Date.now();
    const optimisticMsg: IMessage = {
      id: optimisticId,
      product_id: productId,
      user_chat_id: userChatId,
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const response = await mutate({ productId, userChatId, content });
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimisticId),
        ...response,
      ]);
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
    }
  };

  return (
    <ErrorBoundary>
    <AppDataProvider productId={productId} userChatId={userChatId}>
      <section class={clsx(styles.root, styles[theme])}>
        <header class={styles.header}>
          {productLoading ? (
            <span class={styles.titleSkeleton} />
          ) : (
            <span class={styles.title}>{product?.assistant_name ?? "Sales Assistant"}</span>
          )}
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

        <ChatMessagesList messages={messages} isPending={loading} />

        <footer class={styles.footer}>
          <MessageInput onSend={handleSend} disabled={loading} />
        </footer>
      </section>
    </AppDataProvider>
    </ErrorBoundary>
  );
}
