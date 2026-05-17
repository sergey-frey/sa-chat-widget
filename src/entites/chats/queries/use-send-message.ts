import { useMutation } from "@/shared/api";
import { chatsService } from "../lib/chats.service";
import type { ISendMessagePayload, ISendMessageResponse } from "../lib/schemas";

export function useSendMessage() {
  return useMutation<ISendMessageResponse, ISendMessagePayload>(
    chatsService.sendMessage,
  );
}
