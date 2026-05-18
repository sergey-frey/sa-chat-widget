import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { ChatMessage, TypingIndicator } from "@/components/chat-message";
import type { IMessage } from "@/shared/schemas/message";
import styles from "../styles/chat-messages-list.module.scss";

type ListItem = { type: "message"; message: IMessage } | { type: "typing" };

interface IProps extends HTMLAttributes<HTMLDivElement> {
  messages: IMessage[];
  isPending?: boolean;
}

export const ChatMessagesList = ({
  messages,
  isPending,
  class: className,
  ...props
}: IProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const items: ListItem[] = [
    ...messages.map((message): ListItem => ({ type: "message", message })),
    ...(isPending ? [{ type: "typing" } satisfies ListItem] : []),
  ];

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    measureElement: (el) => el.getBoundingClientRect().height,
    overscan: 5,
    gap: 12,
  });

  useEffect(() => {
    if (items.length > 0) {
      virtualizer.scrollToIndex(items.length - 1, { behavior: "smooth" });
    }
  }, [messages.length, isPending]);

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      class={clsx(styles["chat-messages-list"], className)}
      {...props}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {item.type === "typing" ? (
                <TypingIndicator />
              ) : (
                <ChatMessage
                  authorRole={item.message.role}
                  content={item.message.content}
                  createdAt={item.message.created_at}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
