import { AnimatePresence, motion } from "motion/react";
import { useState } from "preact/hooks";
import { css } from "@/shared/styled-system/css";
import { Button } from "@/shared/ui/button";

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section
      class={css({
        position: "fixed",
        bottom: 4,
        right: 4,
        display: "grid",
        justifyItems: "end",
        gap: 2,
      })}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.article
            initial={{ opacity: 0, y: 16, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.5 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            class={css({
              h: 450,
              w: 320,
              bg: "surface.default",
              border: "solid",
              borderWidth: 1,
              borderColor: "accent.border",
              rounded: "panel",
              shadow:
                "0 8px 32px rgba(0, 0, 0, 0.45), 0 2px 8px {colors.accent.bgActive}",
              overflow: "hidden",
            })}
          >
            Chat
          </motion.article>
        )}
      </AnimatePresence>

      <Button onClick={handleOpenClick}>Ask AI</Button>
    </section>
  );
}
