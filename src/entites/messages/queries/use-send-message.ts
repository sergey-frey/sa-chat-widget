import { useMutation } from "@/shared/api";
import { messagesService } from "../lib/messages.service";
import type { ISendMessagePayload, ISendMessageResponse } from "../lib/schemas";

interface IOptions {
  throwOnError?: boolean;
}

export function useSendMessage(options: IOptions = {}) {
  return useMutation<ISendMessageResponse, ISendMessagePayload>(
    messagesService.sendMessage,
    options,
  );
}
