import clsx from "clsx";
import { format } from "date-fns";
import type { HTMLAttributes } from "preact";
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
  const formattedDate = format(new Date(createdAt), "dd.MM.yyyy HH:mm");

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
        <div class={styles["chat-message__bubble"]}>{content}</div>
        {/*<span class={styles["chat-message__time"]}>{formattedDate}</span>*/}
      </ChatMessageRow>
    </div>
  );
};
