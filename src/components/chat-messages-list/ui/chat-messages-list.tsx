import clsx from "clsx";
import type { ComponentChildren, HTMLAttributes } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { ChatMessage, TypingIndicator } from "@/components/chat-message";
import type { IMessage } from "@/shared/schemas/message";
import styles from "../styles/chat-messages-list.module.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  messages: IMessage[];
  isPending?: boolean;
  lastAssistantAppend?: ComponentChildren;
  appendItem?: ComponentChildren;
}

export const ChatMessagesList = ({
  messages,
  isPending,
  lastAssistantAppend,
  appendItem,
  class: className,
  ...props
}: IProps) => {
  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  })();

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isPending]);

  useEffect(() => {
    scrollToBottom();
  }, [!!appendItem]);

  return (
    <div
      ref={containerRef}
      class={clsx(styles["chat-messages-list"], className)}
      {...props}
    >
      <div class={styles["chat-messages-list__inner"]}>
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            authorRole={message.role}
            content={message.content}
            createdAt={message.created_at}
            append={
              lastAssistantAppend &&
              !isPending &&
              message.role === "assistant" &&
              index === lastAssistantIndex
                ? lastAssistantAppend
                : undefined
            }
          />
        ))}
        {isPending && <TypingIndicator />}
        {appendItem}
      </div>
    </div>
  );
};
