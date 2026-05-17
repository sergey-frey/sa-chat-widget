import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import type { IRole } from "@/shared/schemas/message";
import styles from "../styles/chat-message.module.scss";

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "authorRole"> {
  authorRole: IRole;
  content: string;
}

export const ChatMessage = ({
  authorRole,
  content,
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
      <div class={styles["chat-message__bubble"]}>{content}</div>
    </div>
  );
};
