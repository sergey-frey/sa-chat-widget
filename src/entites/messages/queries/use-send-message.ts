import { useMutation } from "@/shared/api";
import { messagesService } from "../lib/messages.service";
import type { ISendMessagePayload, ISendMessageResponse } from "../lib/schemas";

export function useSendMessage() {
  return useMutation<ISendMessageResponse, ISendMessagePayload>(
    messagesService.sendMessage,
  );
}
