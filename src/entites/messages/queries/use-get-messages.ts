import { useQuery } from "@/shared/api";
import { messagesService } from "../lib/messages.service";
import type { IGetMessagesPayload } from "../lib/schemas";

export function useGetMessages({ productId, userChatId }: IGetMessagesPayload) {
  return useQuery(
    () => messagesService.getMessages({ productId, userChatId }),
    [productId, userChatId],
  );
}
