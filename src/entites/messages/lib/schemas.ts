import * as v from "valibot";
import { MessageSchema } from "@/shared/schemas/message";

export const GetMessagesPayloadSchema = v.object({
  productId: v.number(),
  userChatId: v.string(),
});

export type IGetMessagesPayload = v.InferInput<typeof GetMessagesPayloadSchema>;

export const GetMessagesResponseSchema = v.array(MessageSchema);

export type IGetMessagesResponse = v.InferInput<
  typeof GetMessagesResponseSchema
>;

export const SendMessagePayloadSchema = v.object({
  productId: v.number(),
  userChatId: v.string(),
  content: v.string(),
});

export type ISendMessagePayload = v.InferInput<typeof SendMessagePayloadSchema>;

export const SendMessageResponseSchema = v.array(MessageSchema);

export type ISendMessageResponse = v.InferInput<
  typeof SendMessageResponseSchema
>;
