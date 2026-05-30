import { useRef } from "preact/hooks";
import { useSwipeable } from "react-swipeable";

interface IOptions {
  onOpenChange?: (open: boolean) => void;
}

export const useDrawerSwipeable = ({ onOpenChange }: IOptions) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const swipeHandlers = useSwipeable({
    onSwiping: ({ absY, dir }) => {
      if (dir !== "Down") return;
      const el = contentRef.current;
      if (!el) return;
      el.style.transition = "none";
      el.style.transform = `translateY(${absY}px)`;
    },
    onSwiped: ({ dir, absY, velocity }) => {
      const el = contentRef.current;
      if (!el) return;
      el.style.transition = "";

      if (dir === "Down" && (absY > 60 || velocity > 0.5)) {
        el.style.setProperty("--drag-delta", `${absY}px`);
        el.setAttribute("data-swipe-dismiss", "");
        onOpenChange?.(false);
      } else {
        el.style.transition = "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)";
        el.style.transform = "";
        el.addEventListener(
          "transitionend",
          () => {
            el.style.transition = "";
          },
          { once: true },
        );
      }
    },
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return { contentRef, swipeHandlers };
};
