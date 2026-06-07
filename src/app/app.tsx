import { RiCloseLine, RiMessage2Line, RiMoonLine, RiSunLine } from "@remixicon/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { ChatMessagesList } from "@/components/chat-messages-list";
import { ContactForm, OpenContactFormButton } from "@/components/contact-form";
import { MessageInput } from "@/components/message-input";
import { useGetMessages, useSendMessage } from "@/entites/messages";
import { useGetProduct } from "@/entites/products";
import { AppDataProvider } from "@/shared/lib/app-data-provider";
import { useMediaQuery } from "@/shared/lib/use-media-query";
import type { IMessage } from "@/shared/schemas/message";
import { Button } from "@/shared/ui/button";
import { DrawerContent, DrawerRoot } from "@/shared/ui/drawer";
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import styles from "./styles/app.module.scss";

type Theme = "light" | "dark";

const CONTACT_SUBMISSION_PREFIX = "Контакт для связи";

const isContactSubmissionMessage = (m: IMessage) =>
  m.role === "user" && m.content.startsWith(CONTACT_SUBMISSION_PREFIX);

interface IProps {
  productId: number;
  userChatId: string;
}

export function App({ productId, userChatId }: IProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [leadCollected, setLeadCollected] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  const initialized = useRef(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const { data: product, loading: productLoading } = useGetProduct({ productId });
  const { data } = useGetMessages({ productId, userChatId });
  const { mutate, loading } = useSendMessage();

  useEffect(() => {
    if (data && !initialized.current) {
      initialized.current = true;
      setMessages(data);
      if (data.some(isContactSubmissionMessage)) {
        setLeadCollected(true);
      }
    }
  }, [data]);

  const handleSend = async (content: string) => {
    setFormOpen(false);
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

  const chatContent = (
    <>
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
            <RiMoonLine style={{ width: "1rem", height: "1rem", minWidth: "1rem" }} />
          ) : (
            <RiSunLine style={{ width: "1rem", height: "1rem", minWidth: "1rem" }} />
          )}
        </Button>
      </header>

      <ChatMessagesList
        messages={messages}
        isPending={loading}
        lastAssistantAppend={
          !leadCollected && !loading && !formOpen && messages.length > 0 ? (
            <OpenContactFormButton onClick={() => setFormOpen(true)} />
          ) : undefined
        }
        appendItem={
          !leadCollected && !loading && formOpen ? (
            <ContactForm
              productId={productId}
              userChatId={userChatId}
              onSuccess={(newMessages) => {
                setMessages((prev) => [...prev, ...newMessages]);
                setLeadCollected(true);
                setFormOpen(false);
              }}
              onClose={() => setFormOpen(false)}
            />
          ) : undefined
        }
      />

      <footer class={styles.footer}>
        <MessageInput onSend={handleSend} disabled={loading} />
      </footer>
    </>
  );

  return (
    <ErrorBoundary>
      <AppDataProvider productId={productId} userChatId={userChatId}>
        {/*
          Anchor lives inside shadow DOM — portal renders here so Drawer
          content inherits adopted stylesheets and CSS variables.
        */}
        <div ref={setPortalContainer} class={styles[theme]} />

        {!isMobile && (
          <>
            <button
              type="button"
              class={clsx(styles.fab, styles[theme])}
              onClick={() => setChatOpen((o) => !o)}
              aria-label={chatOpen ? "Close chat" : "Open chat"}
            >
              {chatOpen ? (
                <RiCloseLine style={{ width: "1.5rem", height: "1.5rem", minWidth: "1.5rem" }} />
              ) : (
                <RiMessage2Line style={{ width: "1.5rem", height: "1.5rem", minWidth: "1.5rem" }} />
              )}
            </button>

            <section
              class={clsx(styles.root, styles[theme], { [styles.rootVisible]: chatOpen })}
              aria-hidden={!chatOpen}
            >
              {chatContent}
            </section>
          </>
        )}

        {isMobile && (
          <>
            <button
              type="button"
              class={clsx(styles.fab, styles[theme])}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open chat"
            >
              <RiMessage2Line style={{ width: "1.5rem", height: "1.5rem", minWidth: "1.5rem" }} />
            </button>

            {portalContainer && (
              <DrawerRoot open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent side="bottom" container={portalContainer} showHandle>
                  <div class={clsx(styles.drawerInner, styles[theme])}>
                    {chatContent}
                  </div>
                </DrawerContent>
              </DrawerRoot>
            )}
          </>
        )}
      </AppDataProvider>
    </ErrorBoundary>
  );
}
