import {
  RiArrowLeftLine,
  RiCloseLine,
  RiPhoneLine,
  RiTelegram2Line,
  RiWhatsappLine,
} from "@remixicon/react";
import { useState } from "preact/hooks";
import { type IContactType, useSendMessage } from "@/entites/messages";
import type { IMessage } from "@/shared/schemas/message";
import { Button } from "@/shared/ui/button";
import styles from "../styles/contact-form.module.scss";

interface IProps {
  productId: number;
  userChatId: string;
  onSuccess: (newMessages: IMessage[]) => void;
  onClose: () => void;
}

const CHANNELS: { type: IContactType; label: string; icon: typeof RiPhoneLine }[] = [
  { type: "telegram", label: "Telegram", icon: RiTelegram2Line },
  { type: "whatsapp", label: "WhatsApp", icon: RiWhatsappLine },
  { type: "phone", label: "Звонок", icon: RiPhoneLine },
];

const TG_RE = /^@?[a-zA-Z0-9_]{5,32}$/;
const PHONE_RE = /^\+?[0-9]{7,15}$/;

function validate(type: IContactType, value: string): string | null {
  const v = value.trim();
  if (!v) return "Заполните поле";
  if (type === "telegram") {
    if (!TG_RE.test(v)) return "Неверный Telegram username";
    return null;
  }
  const cleaned = v.replace(/[\s\-()]/g, "");
  if (!PHONE_RE.test(cleaned)) return "Неверный номер телефона";
  return null;
}

export function ContactForm({
  productId,
  userChatId,
  onSuccess,
  onClose,
}: IProps) {
  const [channel, setChannel] = useState<IContactType | null>(null);
  const [value, setValue] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { mutate, loading, error } = useSendMessage({ throwOnError: false });

  const closeButton = (
    <Button
      type="button"
      variant="ghost"
      isIconOnly
      size="sm"
      onClick={onClose}
      aria-label="Закрыть форму"
      disabled={loading}
    >
      <RiCloseLine style={{ width: "1rem", height: "1rem", minWidth: "1rem" }} />
    </Button>
  );

  if (!channel) {
    return (
      <div class={styles.root}>
        <div class={styles.header}>
          <p class={styles.prompt}>Как менеджеру удобнее связаться с вами?</p>
          {closeButton}
        </div>
        <div class={styles.channels}>
          {CHANNELS.map(({ type, label, icon: Icon }) => (
            <Button
              key={type}
              variant="outlined"
              size="sm"
              class={styles.channelButton}
              onClick={() => setChannel(type)}
            >
              <Icon style={{ width: "1rem", height: "1rem", minWidth: "1rem", marginRight: "0.25rem" }} />
              {label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const err = validate(channel, value);
    if (err) {
      setLocalError(err);
      return;
    }
    setLocalError(null);
    try {
      const result = await mutate({
        productId,
        userChatId,
        contact: {
          contact_type: channel,
          contact_value: value.trim(),
        },
      });
      onSuccess(result);
    } catch {
      // error surfaced via the `error` field below
    }
  };

  const label =
    channel === "telegram" ? "Telegram username" : "Номер телефона";
  const placeholder = channel === "telegram" ? "@username" : "+7 999 000-00-00";
  const errMsg =
    localError ?? (error ? "Не удалось отправить. Попробуйте ещё раз." : null);

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <div class={styles.header}>
        <p class={styles.prompt}>Оставьте контакт — менеджер свяжется с вами.</p>
        {closeButton}
      </div>
      <div class={styles.inputRow}>
        <label class={styles.label} for="contact-form-value">
          {label}
        </label>
        <input
          id="contact-form-value"
          class={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          disabled={loading}
          autoFocus
        />
        {errMsg && <span class={styles.error}>{errMsg}</span>}
      </div>
      <div class={styles.actions}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setChannel(null);
            setValue("");
            setLocalError(null);
          }}
          disabled={loading}
        >
          <RiArrowLeftLine style={{ width: "1rem", height: "1rem", minWidth: "1rem" }} />
          Назад
        </Button>
        <Button type="submit" variant="solid" size="sm" isLoading={loading}>
          Отправить
        </Button>
      </div>
    </form>
  );
}
