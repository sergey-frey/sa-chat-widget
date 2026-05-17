import * as v from "valibot";
import { MessageSchema } from "@/shared/schemas/message";

export type ICreateChatPayload = {
  productId: number;
};

export const CreateChatResponseSchema = v.object({
  id: v.number(),
  product_id: v.number(),
  created_at: v.pipe(v.string(), v.isoDateTime()),
});

export type ICreateChatResponse = v.InferInput<typeof CreateChatResponseSchema>;

export const GetMessagesPayloadSchema = v.object({
  chatId: v.number(),
});

export type IGetMessagesPayload = v.InferInput<typeof GetMessagesPayloadSchema>;

export const GetMessagesResponseSchema = v.array(MessageSchema);

export type IGetMessagesResponse = v.InferInput<
  typeof GetMessagesResponseSchema
>;

export const SendMessagePayloadSchema = v.object({
  chatId: v.number(),
  content: v.string(),
});

export type ISendMessagePayload = v.InferInput<typeof SendMessagePayloadSchema>;

export const SendMessageResponseSchema = v.array(MessageSchema);

export type ISendMessageResponse = v.InferInput<
  typeof SendMessageResponseSchema
>;
