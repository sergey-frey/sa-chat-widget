import styles from "../styles/chat-message.module.scss";
import { ChatMessageRow } from "./chat-message-row";

export const TypingIndicator = () => {
  return (
    <div class={`${styles["chat-message"]} ${styles["chat-message--assistant"]}`}>
      <ChatMessageRow>
        <div class={styles["chat-message__bubble"]}>
          <div class={styles["typing-indicator"]}>
            <span class={styles["typing-indicator__dot"]} />
            <span class={styles["typing-indicator__dot"]} />
            <span class={styles["typing-indicator__dot"]} />
          </div>
        </div>
      </ChatMessageRow>
    </div>
  );
};
