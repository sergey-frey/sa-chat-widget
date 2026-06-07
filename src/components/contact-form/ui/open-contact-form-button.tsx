import { RiUserAddLine } from "@remixicon/react";
import { Button } from "@/shared/ui/button";
import styles from "../styles/contact-form.module.scss";

interface IProps {
  onClick: () => void;
}

export function OpenContactFormButton({ onClick }: IProps) {
  return (
    <Button
      type="button"
      variant="soft"
      size="sm"
      class={styles.openButton}
      onClick={onClick}
    >
      <RiUserAddLine
        style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }}
      />
      Оставить контакт
    </Button>
  );
}
