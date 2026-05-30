import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import Markdown from "react-markdown";
import type { IRole } from "@/shared/schemas/message";
import styles from "../styles/chat-message.module.scss";
import { ChatMessageRow } from "./chat-message-row";

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "authorRole"> {
  authorRole: IRole;
  content: string;
  createdAt: string;
}

export const ChatMessage = ({
  authorRole,
  content,
  createdAt,
  class: className,
  ...props
}: IProps) => {
  return (
    <div
      class={clsx(
        styles["chat-message"],
        styles[`chat-message--${authorRole}`],
        className,
      )}
      {...props}
    >
      <ChatMessageRow>
        <div class={styles["chat-message__bubble"]}>
          <Markdown skipHtml>{content}</Markdown>
        </div>
      </ChatMessageRow>
    </div>
  );
};
