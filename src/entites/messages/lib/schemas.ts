import * as v from "valibot";
import { MessageSchema } from "@/shared/schemas/message";

export const ContactTypeSchema = v.picklist(["telegram", "whatsapp", "phone"]);

export type IContactType = v.InferInput<typeof ContactTypeSchema>;

export const GetMessagesPayloadSchema = v.object({
  productId: v.number(),
  userChatId: v.string(),
});

export type IGetMessagesPayload = v.InferInput<typeof GetMessagesPayloadSchema>;

export const GetMessagesResponseSchema = v.array(MessageSchema);

export type IGetMessagesResponse = v.InferInput<
  typeof GetMessagesResponseSchema
>;

export const ContactSubmissionSchema = v.object({
  contact_type: ContactTypeSchema,
  contact_value: v.string(),
});

export type IContactSubmission = v.InferInput<typeof ContactSubmissionSchema>;

export const SendMessagePayloadSchema = v.object({
  productId: v.number(),
  userChatId: v.string(),
  content: v.optional(v.string()),
  contact: v.optional(ContactSubmissionSchema),
});

export type ISendMessagePayload = v.InferInput<typeof SendMessagePayloadSchema>;

export const SendMessageResponseSchema = v.array(MessageSchema);

export type ISendMessageResponse = v.InferInput<
  typeof SendMessageResponseSchema
>;
