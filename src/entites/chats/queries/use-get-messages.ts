import { useQuery } from "@/shared/api";
import { chatsService } from "../lib/chats.service";

export function useGetMessages(chatId: number | null) {
  return useQuery(
    () => chatsService.getMessages({ chatId: chatId! }),
    [chatId],
    { enabled: chatId !== null },
  );
}
