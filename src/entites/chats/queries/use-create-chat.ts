import { useMutation } from "@/shared/api";
import { chatsService } from "../lib/chats.service";
import type { ICreateChatPayload, ICreateChatResponse } from "../lib/schemas";

export function useCreateChat() {
  return useMutation<ICreateChatResponse, ICreateChatPayload>(
    chatsService.createChat,
  );
}
