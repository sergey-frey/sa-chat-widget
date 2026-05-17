import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { ChatMessage } from "@/components/chat-message";
import type { IMessage } from "@/shared/schemas/message";
import styles from "../styles/chat-messages-list.module.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  messages: IMessage[];
}

export const ChatMessagesList = ({
  messages,
  class: className,
  ...props
}: IProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div class={clsx(styles["chat-messages-list"], className)} {...props}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          authorRole={message.role}
          content={message.content}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
