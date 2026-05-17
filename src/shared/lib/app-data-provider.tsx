import type { ComponentChildren } from "preact";
import { createContext } from "preact";
import { useContext } from "preact/hooks";

interface AppData {
  productId: number;
  userChatId: string;
}

const AppDataContext = createContext<AppData | null>(null);

interface IProps extends AppData {
  children: ComponentChildren;
}

export function AppDataProvider({ productId, userChatId, children }: IProps) {
  return (
    <AppDataContext.Provider value={{ productId, userChatId }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData(): AppData {
  const ctx = useContext(AppDataContext);

  if (!ctx) {
    throw new Error("useAppData must be used within AppDataProvider");
  }

  return ctx;
}
