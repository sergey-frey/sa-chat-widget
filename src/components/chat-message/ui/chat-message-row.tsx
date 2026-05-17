import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import styles from "../styles/chat-message.module.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatMessageRow = ({ class: className, ...props }: IProps) => {
  return (
    <div class={clsx(styles["chat-message__row"], className)} {...props} />
  );
};
