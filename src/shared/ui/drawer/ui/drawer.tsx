import clsx from "clsx";
import type { ComponentChildren } from "preact";
import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Dialog } from "radix-ui";
import { useDrawerSwipeable } from "../lib/use-drawer-swipable";
import styles from "../styles/drawer.module.scss";

type DrawerSide = "top" | "bottom" | "left" | "right";

interface IDrawerContext {
  onOpenChange?: (open: boolean) => void;
}

const DrawerCtx = createContext<IDrawerContext>({});

interface IDrawerRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ComponentChildren;
}

interface IDrawerContentProps {
  side?: DrawerSide;
  showHandle?: boolean;
  class?: string;
  container?: HTMLElement | null;
  children: ComponentChildren;
}

export const DrawerRoot = ({
  open,
  onOpenChange,
  children,
}: IDrawerRootProps) => (
  <DrawerCtx.Provider value={{ onOpenChange }}>
    {/*
      modal={false} disables react-remove-scroll inside Radix Dialog.
      Without it, the library's global touchmove listener calls preventDefault()
      on all touch events because Shadow DOM event retargeting makes every touch
      look like it originates from the shadow host (outside the dialog) — blocking
      scroll inside the drawer content.
    */}
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      {children}
    </Dialog.Root>
  </DrawerCtx.Provider>
);

export const DrawerTrigger = Dialog.Trigger;
export const DrawerClose = Dialog.Close;
export const DrawerTitle = Dialog.Title;
export const DrawerDescription = Dialog.Description;

export function DrawerContent({
  side = "bottom",
  showHandle = true,
  class: className,
  container,
  children,
}: IDrawerContentProps) {
  const { onOpenChange } = useContext(DrawerCtx);
  const { contentRef, swipeHandlers } = useDrawerSwipeable({ onOpenChange });

  return (
    <Dialog.Portal container={container}>
      <Dialog.Overlay class={styles.overlay} />
      <Dialog.Content
        ref={(el: HTMLDivElement | null) => {
          contentRef.current = el;
        }}
        class={clsx(styles.content, styles[side], className)}
      >
        {showHandle && side === "bottom" && (
          <div
            {...(swipeHandlers as object)}
            class={styles.handle}
            aria-hidden="true"
          />
        )}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
